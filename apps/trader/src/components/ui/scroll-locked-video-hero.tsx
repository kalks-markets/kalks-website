"use client"

import { useEffect, useRef, useState } from "react"
import { KalksLogo } from "@/components/brand/KalksLogo"

// ─────────────────────────────────────────────────────────────
// THE CITY OPENS — locked scroll-scrub video hero
// The page cannot move while this is active — body is pinned
// with position:fixed (the same bulletproof technique modal
// libraries use; plain overflow:hidden alone isn't reliable
// across browsers). Wheel/touch input is captured and used
// purely to drive video.currentTime, forward and backward. Once
// the video reaches the end and the user keeps pushing forward,
// the page unlocks and continues normally — and re-locks if they
// scroll back up into it. No dependencies, system fonts only.
// ─────────────────────────────────────────────────────────────

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Total input distance (px) needed to scrub the full video. Tune to taste. */
  scrubDistance?: number
  className?: string
  style?: React.CSSProperties
}

// Kalks: the founder's own hero video, self-hosted at public/video/kalks-hero.mp4. Encoded H.264 with a 6-frame GOP
// and no audio so scroll-scrubbing (seeking backward and forward) stays smooth.
const DEFAULT_VIDEO = "/video/kalks-hero.mp4"
const DEFAULT_SIGNATURE = false as const
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "Kalks", // Kalks: the logo's accessible name (the logo replaces the original "THE CITY OPENS" text)
  scrollHint = "SCROLL",
  tagline = "Trade the world. Not the noise.",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 3200,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0
    // Kalks: a touch gesture that began while locked keeps touch-action:none, so once the lock is released
    // mid-gesture the page is scrolled by hand for the rest of that gesture.
    let manualTouchScroll = false

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (reduceMotion) {
        video.currentTime = duration * 0.92
      }
    }
    video.addEventListener("loadeddata", onLoadedData)

    // iOS Safari often won't buffer any video data — even with
    // preload="auto" — until playback actually starts, to save mobile
    // data. Since we only ever seek (never call play() elsewhere), the
    // video can stay permanently blank on iPhone. Force a silent
    // play-then-immediately-pause on mount to kick off real loading.
    const kickstartLoad = () => {
      const p = video.play()
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
    }
    kickstartLoad()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t: number) {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video!.currentTime = t
    }

    // Kalks change (the only behavioural one): the lock is released when the video has reached the end and the user
    // keeps scrolling forward, so the page continues below; it re-engages when the user comes back to the very top of
    // the page. It never engages when the page loads scrolled down / with an #anchor, or with reduced motion, and it
    // is always released on unmount (client-side navigation away from the page restores the body).
    function engageLock() {
      if (locked || typeof document === "undefined") return
      locked = true
      lockedScrollY = window.scrollY
      const b = document.body.style
      b.position = "fixed"
      b.top = `-${lockedScrollY}px`
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.height = "100%"
      b.overscrollBehavior = "none"
      section!.style.touchAction = "none"
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return
      locked = false
      const y = lockedScrollY
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.height = ""
      b.overscrollBehavior = ""
      window.scrollTo(0, y)
      section!.style.touchAction = "pan-y"
    }

    const atEnd = () => targetProgress >= 1 && currentProgress > 0.985
    const atTop = () => window.scrollY <= 1
    const heroInView = () => section.getBoundingClientRect().bottom > 0

    const startsScrolled = window.scrollY > 1 || (typeof location !== "undefined" && location.hash.length > 1)
    if (reduceMotion || startsScrolled) {
      // Show the final frame and the tagline; the page scrolls normally.
      targetProgress = 1
      currentProgress = 1
      hasStartedScrolling = true
      section.style.touchAction = "pan-y"
      if (reduceMotion) {
        if (taglineRef.current) {
          taglineRef.current.style.opacity = "1"
          taglineRef.current.style.filter = "none"
          taglineRef.current.style.transform = "none"
        }
        if (titleRef.current) titleRef.current.style.opacity = "0"
        if (hintRef.current) hintRef.current.style.opacity = "0"
        if (progressBarRef.current) progressBarRef.current.style.transform = "scaleX(1)"
      }
    } else {
      engageLock()
    }

    // Back at the very top with the hero in view: lock again (scrolling up then scrubs the video backwards).
    const onScroll = () => {
      if (!locked && !reduceMotion && atTop() && heroInView()) engageLock()
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    function addDelta(deltaY: number) {
      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      targetProgress = next
      if (targetProgress > 0.001) hasStartedScrolling = true
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || reduceMotion) return
      if (!locked) {
        // Unlocked: the page scrolls normally, except scrolling up at the very top re-engages the lock.
        if (e.deltaY < 0 && atTop() && heroInView()) {
          engageLock()
          addDelta(e.deltaY)
          e.preventDefault()
        }
        return
      }
      if (e.deltaY > 0 && atEnd()) {
        // Video finished and the user keeps going: release and let this wheel scroll the page.
        releaseLock()
        return
      }
      addDelta(e.deltaY)
      e.preventDefault()
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
      manualTouchScroll = false
    }
    const onTouchMove = (e: TouchEvent) => {
      if (reduceMotion) return
      const y = e.touches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - y
      if (deltaY === 0) return
      touchStartY = y
      if (!locked) {
        if (manualTouchScroll) {
          window.scrollBy(0, deltaY)
          e.preventDefault()
        } else if (deltaY < 0 && atTop() && heroInView()) {
          engageLock()
          addDelta(deltaY)
          e.preventDefault()
        }
        return
      }
      if (deltaY > 0 && atEnd()) {
        releaseLock()
        manualTouchScroll = true
        window.scrollBy(0, deltaY)
        e.preventDefault()
        return
      }
      addDelta(deltaY)
      e.preventDefault()
    }

    // Keyboard drives the scrub the same way (Space / PageDown / arrows / End / Home), unless focus is in a field.
    const onKeyDown = (e: KeyboardEvent) => {
      if (reduceMotion || e.altKey || e.ctrlKey || e.metaKey) return
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      const step = window.innerHeight * 0.9
      let d = 0
      if (e.key === "ArrowDown") d = 120
      else if (e.key === "ArrowUp") d = -120
      else if (e.key === "PageDown" || (e.key === " " && !e.shiftKey)) d = step
      else if (e.key === "PageUp" || (e.key === " " && e.shiftKey)) d = -step
      else if (e.key === "End") d = Infinity
      else if (e.key === "Home") d = -Infinity
      else return
      if (!locked) {
        if (d < 0 && atTop() && heroInView()) {
          engageLock()
          targetProgress = d === -Infinity ? 0 : clamp(targetProgress + d / scrubDistance, 0, 1)
          e.preventDefault()
        }
        return
      }
      if (d > 0 && atEnd()) {
        releaseLock()
        return // the browser scrolls the page for this key
      }
      if (d === Infinity) {
        targetProgress = 1
        hasStartedScrolling = true
      } else if (d === -Infinity) {
        targetProgress = 0
      } else {
        addDelta(d)
      }
      e.preventDefault()
    }
    window.addEventListener("keydown", onKeyDown)

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    // Also bind directly on the element itself, with capture — on some
    // iOS versions a window-level listener alone can lose the race
    // against the browser's own native scroll handling.
    section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true })
    section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

      if (duration > 0) {
        seekTo(currentProgress * duration)
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }
      if (taglineRef.current) {
        // Mirrors the title's blur-focus treatment, timed as the payoff
        // once the reveal is nearly complete — not a background afterthought.
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKeyDown)
      section.removeEventListener("touchstart", onTouchStart, true)
      section.removeEventListener("touchmove", onTouchMove, true)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {/* Kalks: the original white Kalks logo in place of the title text (same animation via titleRef). */}
        <span
          style={{
            display: "inline-block",
            width: "clamp(180px, 34vw, 520px)",
            color: COL_TEXT,
            filter: "drop-shadow(0 4px 30px rgba(0,0,0,0.5))",
            willChange: "transform, filter, opacity",
          }}
        >
          <KalksLogo className="block h-auto w-full" title={title} />
        </span>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
            // Kalks: the video ends on a bright sunrise sky, so a soft navy glow sits behind the tagline (it fades in
            // and out with the tagline) to keep the white text readable.
            background: "radial-gradient(ellipse 52% 26% at 50% 50%, rgba(8,22,64,0.58), rgba(8,22,64,0) 72%)",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 1px 3px rgba(8,22,64,0.7), 0 4px 28px rgba(8,22,64,0.75)",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Thin progress line — fills as the video advances. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = COL_TEXT
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = "rgba(220,224,232,0.6)"
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}
