"use client"
// Ported from the YapShop repo's landing page (src/app/page.tsx). Links open the live site through
// PreviewLiveNav (data-live-href); the CSS is scoped under .ypp so it can't touch the portfolio.
import { useEffect } from "react"

/**
 * Landing page. Marketing surface for the agentic AI WhatsApp dashboard.
 *
 * Why this file is one big component: the source of truth is the static
 * marketing copy in public/yapshop.html (designed + signed off as a whole).
 * Splitting into sub-components would force every copy tweak to find the
 * right file. Kept inline so a writer can ctrl-F any phrase and edit it.
 *
 * CSS is injected as a single dangerouslySetInnerHTML string so the styles
 * stay verbatim from the design. The chat-player + scroll-reveal script
 * lives in a useEffect and tears itself down on unmount.
 */
export const YapShopPreview = () => {
  useEffect(() => {
    // Nav scroll state: adds a bottom border once the page is scrolled.
    const nav = document.getElementById("yapshop-nav")
    const onScroll = () => {
      if (!nav) return
      if (window.scrollY > 20) nav.classList.add("scrolled")
      else nav.classList.remove("scrolled")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    // Reveal-on-scroll for elements marked with data-reveal.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]")
    let io: IntersectionObserver | null = null
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"))
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in")
              io?.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      )
      reveals.forEach((el) => io!.observe(el))
    }

    // Live chat player: fakes typing + handoff messages on a loop.
    type ScriptStep = {
      side: "in" | "out" | "system" | "human"
      tag?: string
      text: string
    }
    const body = document.getElementById("chatBody")
    const chatScript: ScriptStep[] = [
      { side: "in", text: "Hi! Do you have the black sneakers in size 42?" },
      {
        side: "out",
        tag: "AI agent",
        text: 'Yes! The Black Runner in size 42 is <span class="chat-amount">₦18,500</span>. Want me to reserve a pair? 👟',
      },
      { side: "in", text: "Yes please" },
      {
        side: "out",
        tag: "AI agent",
        text: "Done ✓ I've created Order #1024. Pay by transfer or on delivery?",
      },
      { side: "in", text: "Transfer. Can I return it if the size is wrong?" },
      { side: "system", text: "↳ Return question: handed off to Ada (staff)" },
      {
        side: "human",
        tag: "Ada · staff",
        text: "Hi! Yes, returns are easy within 3 days. I'll sort you out personally 😊",
      },
    ]

    function bubble(m: ScriptStep): HTMLDivElement {
      const d = document.createElement("div")
      if (m.side === "system") {
        d.className = "chat-system"
        d.innerHTML = m.text
      } else {
        d.className = "msg " + m.side
        d.innerHTML =
          (m.tag ? '<span class="msg-tag">' + m.tag + "</span>" : "") + m.text
      }
      return d
    }
    function typing(side: "in" | "out"): HTMLDivElement {
      const d = document.createElement("div")
      d.className = "typing" + (side === "out" ? " out" : "")
      d.innerHTML = "<span></span><span></span><span></span>"
      return d
    }

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const safeTimeout = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(id)
    }

    if (body) {
      if (reduce) {
        chatScript.forEach((m) => body.appendChild(bubble(m)))
      } else {
        let i = 0
        let tEl: HTMLDivElement | null = null
        const clearTyping = () => {
          if (tEl) {
            tEl.remove()
            tEl = null
          }
        }
        const step = () => {
          if (cancelled || !body) return
          if (i >= chatScript.length) {
            safeTimeout(() => {
              body.innerHTML = ""
              i = 0
              safeTimeout(step, 400)
            }, 2600)
            return
          }
          const m = chatScript[i]
          if (m.side === "system") {
            body.appendChild(bubble(m))
            i++
            safeTimeout(step, 900)
            return
          }
          const typeSide: "in" | "out" = m.side === "in" ? "in" : "out"
          tEl = typing(typeSide)
          body.appendChild(tEl)
          const dur = m.side === "in" ? 700 : 1000
          safeTimeout(() => {
            clearTyping()
            body.appendChild(bubble(m))
            i++
            safeTimeout(step, m.side === "in" ? 500 : 850)
          }, dur)
        }

        let started = false
        const hero = document.querySelector(".chat-wrap")
        const io2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting && !started) {
                started = true
                safeTimeout(step, 600)
              }
            })
          },
          { threshold: 0.3 },
        )
        if (hero) io2.observe(hero)
        else safeTimeout(step, 600)

        return () => {
          cancelled = true
          window.removeEventListener("scroll", onScroll)
          io?.disconnect()
          io2.disconnect()
          timers.forEach((id) => clearTimeout(id))
        }
      }
    }

    return () => {
      cancelled = true
      window.removeEventListener("scroll", onScroll)
      io?.disconnect()
      timers.forEach((id) => clearTimeout(id))
    }
  }, [])

  return (
    <div className="ypp">
      <style dangerouslySetInnerHTML={{ __html: LANDING_CSS }} />

      <nav id="yapshop-nav" className="yp-nav">
        <div className="nav-inner">
          <span className="brand" aria-label="YapShop home">
            <span className="brand-mark">
              <BrandSvg />
            </span>
            <span className="brand-word">YapShop</span>
          </span>
          <div className="nav-links">
            <span className="nav-anchor">
              How it works
            </span>
            <span className="nav-anchor">
              Features
            </span>
            <span data-live-href="/onboarding" className="nav-cta">
              Start selling
            </span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-orb" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge" data-reveal>
                <span className="hero-badge-dot" />
                <span className="hero-badge-text">Live demo, try it now</span>
              </div>
              <h1 data-reveal style={{ transitionDelay: "0.08s" }}>
                Your shop never sleeps. Neither does the <em>chat.</em>
              </h1>
              <p className="hero-sub" data-reveal style={{ transitionDelay: "0.16s" }}>
                YapShop is an <strong>AI agent</strong> that lives in your WhatsApp, answering customers, taking orders, and collecting payment day and night. When a real person is needed, it taps you in. <strong>Now live, take it for a spin.</strong>
              </p>
              <div className="hero-actions" data-reveal style={{ transitionDelay: "0.24s" }}>
                <span data-live-href="/onboarding" className="btn-primary">
                  Start selling <span aria-hidden="true">→</span>
                </span>
                <span
                  className="btn-ghost"
                >
                  <WhatsappSvg color="var(--malachite)" size={16} />
                  Chat with the demo
                </span>
              </div>
              <div className="hero-trust" data-reveal style={{ transitionDelay: "0.32s" }}>
                <span>
                  <span className="tick">✓</span> No sign-up to explore
                </span>
                <span>
                  <span className="tick">✓</span> Naira-native
                </span>
                <span>
                  <span className="tick">✓</span> Built for Nigerian business
                </span>
              </div>
            </div>

            <div className="chat-wrap" data-reveal style={{ transitionDelay: "0.2s" }}>
              <div className="chat-float chat-float-1">
                <div className="cf-icon">✓</div>
                <div className="cf-text">
                  <div className="cf-title">Order #1024 created</div>
                  <div className="cf-sub">by AI agent · just now</div>
                </div>
              </div>
              <div className="chat-mock">
                <div className="chat-header">
                  <div className="chat-avatar">B</div>
                  <div className="chat-meta">
                    <div className="chat-name">Bella&apos;s Closet</div>
                    <div className="chat-status">
                      <span className="dot" /> AI agent · online
                    </div>
                  </div>
                  <div className="chat-tag">via YapShop</div>
                </div>
                <div className="chat-body" id="chatBody" />
                <div className="chat-input">
                  <span className="chat-input-field">Message Bella&apos;s Closet…</span>
                  <span className="chat-send" aria-hidden="true">
                    ↑
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="proof">
        <div className="container">
          <div className="proof-inner">
            <div className="proof-item" data-reveal>
              <div className="proof-val">24/7 replies</div>
              <div className="proof-label">The AI answers day and night, never a missed message.</div>
            </div>
            <div className="proof-item" data-reveal style={{ transitionDelay: "0.08s" }}>
              <div className="proof-val">Pidgin + English</div>
              <div className="proof-label">Chats the way your customers actually talk.</div>
            </div>
            <div className="proof-item" data-reveal style={{ transitionDelay: "0.16s" }}>
              <div className="proof-val">Built for Africa</div>
              <div className="proof-label">Naira, local payments, WhatsApp-first, by default.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section flood-sec">
        <div className="container">
          <div className="flood-head" data-reveal>
            <div className="section-eyebrow">The problem</div>
            <h2>
              This is your inbox<br />at 9pm. <em>Every night.</em>
            </h2>
            <p className="lead">WhatsApp is where your customers are, but running a real shop out of a chat inbox means someone has to reply to all of this. Usually you. Usually alone.</p>
          </div>
          <div className="flood" data-reveal style={{ transitionDelay: "0.1s" }}>
            <div className="flood-msg">
              Is this still available?? <span className="t">9:02 pm</span>
            </div>
            <div className="flood-msg">
              Last price for the black one?<span className="t">9:04 pm</span>
            </div>
            <div className="flood-msg">
              Abeg where are you located<span className="t">9:07 pm</span>
            </div>
            <div className="flood-msg">
              Did you see my transfer?<span className="t">9:11 pm</span>
            </div>
            <div className="flood-msg urgent">
              Hello???<span className="t">9:19 pm</span>
            </div>
            <div className="flood-msg">
              How much for 3?<span className="t">9:23 pm</span>
            </div>
            <div className="flood-msg urgent">
              Pls now I want to buy 🙏<span className="t">9:31 pm</span>
            </div>
            <div className="flood-unread">● 37 unread</div>
          </div>
          <p className="flood-caption" data-reveal>
            Every message you don&apos;t answer fast enough is a sale walking out the door. <b>YapShop answers all of them, instantly, in your voice.</b>
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head center" data-reveal>
            <div className="section-eyebrow">How it works</div>
            <h2>From chaos to one calm thread.</h2>
          </div>
          <div className="thread">
            <div className="thread-step" data-reveal>
              <div className="thread-node">1</div>
              <h3>Hook up your WhatsApp</h3>
              <p>Connect your business number, drop in your products and prices, and tell the AI how you like to talk to customers. Setup takes minutes, not weeks.</p>
              <div className="meta">Setup · minutes</div>
            </div>
            <div className="thread-step" data-reveal style={{ transitionDelay: "0.08s" }}>
              <div className="thread-node">2</div>
              <h3>The AI starts selling</h3>
              <p>It greets buyers, answers the same old questions, recommends what fits, creates the order, and confirms payment, 24/7, even while you sleep.</p>
              <div className="meta">AI agent · always on</div>
            </div>
            <div className="thread-step" data-reveal style={{ transitionDelay: "0.16s" }}>
              <div className="thread-node">3</div>
              <h3>You stay in control</h3>
              <p>Watch everything from one dashboard, jump into any chat when you want to, and let the AI pick back up when you&apos;re done. Nothing slips through.</p>
              <div className="meta">You · one screen</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section flood-sec" id="features">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="section-eyebrow">What&apos;s inside</div>
            <h2>A whole shop assistant, not just a chatbot.</h2>
          </div>
          <div className="feat-grid">
            <div className="feat wide" data-reveal>
              <span className="feat-marker">AI</span>
              <h3>An agent that actually sells</h3>
              <p>It doesn&apos;t just answer, it recommends, upsells, and closes. Trained on your catalogue, speaking the way you&apos;d want a great salesperson to.</p>
              <div className="feat-mini">
                <span className="mm in">Do you have it in red?</span>
                <span className="mm out">Yes! Red&apos;s in stock at ₦12k. Add it?</span>
              </div>
            </div>
            <div className="feat tall" data-reveal style={{ transitionDelay: "0.06s" }}>
              <span className="feat-marker">↳</span>
              <h3>Human handoff, built in</h3>
              <p>When a chat needs a real person, the AI taps in your team in the same conversation, then takes back over when they&apos;re done. No app-switching, nothing dropped.</p>
            </div>
            <div className="feat" data-reveal>
              <span className="feat-marker">₦</span>
              <h3>Orders &amp; payments</h3>
              <p>Transfer, cash on delivery, and cards, each tracked from pending to delivered.</p>
            </div>
            <div className="feat" data-reveal style={{ transitionDelay: "0.06s" }}>
              <span className="feat-marker">▦</span>
              <h3>Products &amp; stock</h3>
              <p>Variants, SKUs, and low-stock alerts so you never oversell.</p>
            </div>
            <div className="feat" data-reveal style={{ transitionDelay: "0.12s" }}>
              <span className="feat-marker">◎</span>
              <h3>Customer memory</h3>
              <p>Every buyer&apos;s orders and chats in one place, so you and the AI always have context.</p>
            </div>
            <div className="feat" data-reveal style={{ transitionDelay: "0.18s" }}>
              <span className="feat-marker">⊞</span>
              <h3>One dashboard</h3>
              <p>The whole business on a single screen, made to be checked from your phone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <div className="cta-band-text" data-reveal>
              <h3>Don&apos;t take our word for it.</h3>
              <p>Message the demo shop on WhatsApp and watch the AI sell to you in real time.</p>
            </div>
            <div className="cta-band-actions" data-reveal style={{ transitionDelay: "0.1s" }}>
              <span
                className="btn-primary"
              >
                <WhatsappSvg color="currentColor" size={17} /> Chat with the demo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HANDOFF */}
      <section className="section handoff" id="handoff">
        <div className="container">
          <div className="handoff-grid">
            <div>
              <div className="section-eyebrow" data-reveal>
                The part nobody else gets right
              </div>
              <h2 data-reveal style={{ transitionDelay: "0.06s" }}>
                The AI knows when to <em>step back.</em>
              </h2>
              <p className="handoff-lead" data-reveal style={{ transitionDelay: "0.12s" }}>
                Automation is great, until a customer needs a human. Most bots either fumble it or trap people in loops. YapShop just hands the chat to you, and gets out of the way.
              </p>
              <div className="handoff-list">
                <div className="handoff-item" data-reveal style={{ transitionDelay: "0.16s" }}>
                  <div className="handoff-item-marker hm-ai">AI</div>
                  <div className="handoff-item-body">
                    <h4>Handles chats by default</h4>
                    <p>Questions, orders, payments, sorted automatically, around the clock.</p>
                  </div>
                </div>
                <div className="handoff-item" data-reveal style={{ transitionDelay: "0.22s" }}>
                  <div className="handoff-item-marker hm-amber">↳</div>
                  <div className="handoff-item-body">
                    <h4>Taps you in when it matters</h4>
                    <p>A complaint, a special request, or a rule you set, the chat moves to your team&apos;s queue.</p>
                  </div>
                </div>
                <div className="handoff-item" data-reveal style={{ transitionDelay: "0.28s" }}>
                  <div className="handoff-item-marker hm-blue">A</div>
                  <div className="handoff-item-body">
                    <h4>You reply in the same thread</h4>
                    <p>No new app, nothing lost. Handle it personally, then resume the AI in one tap.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-reveal style={{ transitionDelay: "0.18s" }}>
              <div className="queue-mock">
                <div className="queue-head">
                  <div className="queue-title">Handoff queue</div>
                  <div className="queue-count">3 waiting</div>
                </div>
                <div className="queue-list">
                  <div className="queue-row">
                    <div className="queue-av">CK</div>
                    <div className="queue-info">
                      <div className="queue-name">Chioma K.</div>
                      <div className="queue-reason">Asked about returns policy</div>
                    </div>
                    <span className="queue-badge qb-amber">requested</span>
                  </div>
                  <div className="queue-row">
                    <div className="queue-av">EU</div>
                    <div className="queue-info">
                      <div className="queue-name">Emeka U.</div>
                      <div className="queue-reason">Wants custom bulk pricing</div>
                    </div>
                    <span className="queue-badge qb-amber">requested</span>
                  </div>
                  <div className="queue-row">
                    <div className="queue-av">AD</div>
                    <div className="queue-info">
                      <div className="queue-name">Ada · claimed</div>
                      <div className="queue-reason">Delivery reschedule · with staff</div>
                    </div>
                    <span className="queue-badge qb-blue">active</span>
                  </div>
                  <div className="queue-row">
                    <div className="queue-av">TF</div>
                    <div className="queue-info">
                      <div className="queue-name">Tunde F.</div>
                      <div className="queue-reason">Resolved · returned to AI</div>
                    </div>
                    <span className="queue-badge qb-teal">resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="section dash-section">
        <div className="container">
          <div className="section-head center" data-reveal>
            <div className="section-eyebrow">The control center</div>
            <h2>
              Your whole business, <em>one screen.</em>
            </h2>
            <p>Made to be glanced at on a phone between customers, and to grow into a full team.</p>
          </div>
          <div className="dash-frame" data-reveal>
            <div className="dash-bar">
              <span className="dash-dot" />
              <span className="dash-dot" />
              <span className="dash-dot" />
              <span className="dash-url">yapshop.emkairosintellisystems.com/dashboard</span>
            </div>
            <div className="dash-body">
              <div className="dash-side">
                <div className="dash-side-icon active">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <div className="dash-side-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
                <div className="dash-side-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 7l9-4 9 4-9 4-9-4Z" />
                    <path d="M3 7v10l9 4 9-4V7" />
                  </svg>
                </div>
                <div className="dash-side-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4c-1.6 0-3-.4-4.3-1L3 20l1-4.7A8.4 8.4 0 1 1 21 11.5Z" />
                  </svg>
                </div>
                <div className="dash-side-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                </div>
              </div>
              <div className="dash-main">
                <div className="dash-h">
                  <div className="dash-h-title">Good morning, Bella</div>
                  <div className="dash-h-sub">Tue · 28 May · 09:14</div>
                </div>
                <div className="dash-kpis">
                  <div className="kpi">
                    <div className="kpi-label">Orders today</div>
                    <div className="kpi-val">14</div>
                    <div className="kpi-trend">▲ 22%</div>
                  </div>
                  <div className="kpi feature">
                    <div className="kpi-label">Revenue · month</div>
                    <div className="kpi-val">₦1.24M</div>
                    <div className="kpi-trend">▲ 31%</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-label">Active chats</div>
                    <div className="kpi-val">7</div>
                    <div className="kpi-trend" style={{ color: "var(--text-3)" }}>
                      live
                    </div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-label">Pending handoffs</div>
                    <div className="kpi-val" style={{ color: "var(--amber)" }}>
                      3
                    </div>
                    <div className="kpi-trend" style={{ color: "var(--amber)" }}>
                      needs you
                    </div>
                  </div>
                </div>
                <div className="dash-row">
                  <div className="dash-panel">
                    <div className="dash-panel-h">
                      Recent orders <span className="mono">live</span>
                    </div>
                    <div className="ord">
                      <span className="ord-id">#1024</span>
                      <span className="ord-name">Black Runner · 42</span>
                      <span className="ord-amt">₦18,500</span>
                      <span className="ord-badge b-paid">paid</span>
                    </div>
                    <div className="ord">
                      <span className="ord-id">#1023</span>
                      <span className="ord-name">Linen Set · M</span>
                      <span className="ord-amt">₦24,000</span>
                      <span className="ord-badge b-pending">pending</span>
                    </div>
                    <div className="ord">
                      <span className="ord-id">#1022</span>
                      <span className="ord-name">Ankara Tote</span>
                      <span className="ord-amt">₦9,800</span>
                      <span className="ord-badge b-shipped">shipped</span>
                    </div>
                    <div className="ord">
                      <span className="ord-id">#1021</span>
                      <span className="ord-name">Slides · 40</span>
                      <span className="ord-amt">₦7,500</span>
                      <span className="ord-badge b-delivered">delivered</span>
                    </div>
                  </div>
                  <div className="dash-panel">
                    <div className="dash-panel-h">Handoff queue</div>
                    <div className="hq">
                      <span className="hq-dot" />
                      <div className="hq-info">
                        <div className="hq-name">Chioma K.</div>
                        <div className="hq-reason">Returns policy</div>
                      </div>
                    </div>
                    <div className="hq">
                      <span className="hq-dot" />
                      <div className="hq-info">
                        <div className="hq-name">Emeka U.</div>
                        <div className="hq-reason">Bulk pricing</div>
                      </div>
                    </div>
                    <div className="hq">
                      <span className="hq-dot" style={{ background: "var(--blue)" }} />
                      <div className="hq-info">
                        <div className="hq-name">Ada · with staff</div>
                        <div className="hq-reason">Reschedule</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="container">
          <div className="section-head center" data-reveal>
            <div className="section-eyebrow">FAQ</div>
            <h2>Fair questions.</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item" data-reveal>
              <div className="faq-q">Do my customers need to download anything?</div>
              <div className="faq-a">Nope. It all happens in the WhatsApp they already use every day, nothing new to install or learn on their end.</div>
            </div>
            <div className="faq-item" data-reveal>
              <div className="faq-q">What if the AI gets something wrong?</div>
              <div className="faq-a">That&apos;s exactly what the handoff is for. You or your staff can jump into any chat the moment you want, sort it out personally, and hand it back to the AI.</div>
            </div>
            <div className="faq-item" data-reveal>
              <div className="faq-q">Can I try it right now?</div>
              <div className="faq-a">
                Yes,{" "}
                <span
                  style={{ color: "var(--malachite)", fontWeight: 500 }}
                >
                  message the demo shop on WhatsApp
                </span>{" "}
                and chat with the AI just like a customer would. No sign-up needed.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="waitlist">
        <div className="cta-bg" />
        <div className="container">
          <div className="cta-inner">
            <h2 data-reveal>Let your WhatsApp do the selling.</h2>
            <p data-reveal style={{ transitionDelay: "0.08s" }}>
              Start your free trial and have the AI agent live on your line in minutes, or message the demo first to see it in action.
            </p>
            <div className="cta-actions" data-reveal style={{ transitionDelay: "0.16s" }}>
              <span data-live-href="/onboarding" className="btn-primary">
                Start selling <span aria-hidden="true">→</span>
              </span>
              <span
                className="btn-ghost"
              >
                <WhatsappSvg color="currentColor" size={16} /> Chat with the demo
              </span>
            </div>
            <div className="cta-note" data-reveal style={{ transitionDelay: "0.24s" }}>
              Free trial · No card required · Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-brand-mark">
                <BrandSvg />
              </div>
              <div className="footer-by">
                A product by{" "}
                <span>
                  emkairos
                </span>
                , building intelligent systems for real-world operations.
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <div className="footer-col-h">Product</div>
                <span>How it works</span>
                <span>Features</span>
                <span
                >
                  Try the demo
                </span>
              </div>
              <div className="footer-col">
                <div className="footer-col-h">Company</div>
                <span>
                  Emkairos
                </span>
                <span
                >
                  LinkedIn
                </span>
                <span
                >
                  Instagram
                </span>
              </div>
              <div className="footer-col">
                <div className="footer-col-h">Legal</div>
                <span data-live-href="/legal/terms">Terms of Service</span>
                <span data-live-href="/legal/privacy">Privacy Policy</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>YapShop · Demo live 2026</span>
            <span>Built for African businesses 🌍</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

/** YapShop brand mark: two stacked rounded glyphs, malachite stroke. */
const BrandSvg = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M22 24 H62 a10 10 0 0 1 10 10 V52 a10 10 0 0 1 -10 10 H40 l-12 12 V62 H22 a10 10 0 0 1 -10 -10 V34 a10 10 0 0 1 10 -10 Z"
      fill="none"
      stroke="#15C26A"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path
      d="M58 48 H86 V82 a4 4 0 0 1 -4 4 H62 a4 4 0 0 1 -4 -4 Z"
      fill="#0D0E10"
      stroke="#15C26A"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path
      d="M66 48 V44 a6 6 0 0 1 12 0 V48"
      fill="none"
      stroke="#15C26A"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
)

/** WhatsApp glyph reused on hero, CTA band, and footer CTAs. */
const WhatsappSvg = ({ color, size }: { color: string; size: number }) => (
  <svg
    className="wa-ico"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    aria-hidden="true"
    style={color === "var(--malachite)" ? { color: "var(--malachite)" } : undefined}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.546 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.448h.006c6.585 0 11.946-5.359 11.949-11.893a11.821 11.821 0 00-3.481-8.464z" />
  </svg>
)

/**
 * Landing-page CSS: preserved verbatim from public/yapshop.html so design
 * tweaks happen in one place. Scoped behind `.yp-nav` and the section-level
 * classes (`.hero`, `.section`, `.faq`, etc.) so it doesn't leak into the
 * dashboard tree even when both surfaces share a page mount in dev.
 */
const LANDING_CSS = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
.ypp{--bg:#0D0E10;--surface:#16171B;--surface-2:#1C1D22;--surface-3:#26272E;
  --border:rgba(255,255,255,0.08);--border-2:rgba(255,255,255,0.13);
  --text:#F4F4F5;--text-2:#A2A2A8;--text-3:#6C6C73;
  --malachite:#15C26A;--malachite-2:#13A85C;--malachite-soft:rgba(21,194,106,0.12);--malachite-line:rgba(21,194,106,0.3);
  --amber:#E5A13A;--blue:#5B9BD5;--teal:#2DD4BF;--red:#EF4444;
  --ease:cubic-bezier(0.22,0.61,0.36,1);--ease-out:cubic-bezier(0.16,1,0.3,1);}
.ypp{font-family:'Geist',-apple-system,sans-serif;background:var(--bg);color:var(--text-2);line-height:1.55;letter-spacing:-0.011em;overflow-x:hidden;position:relative}
.ypp::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0.5;background-image:radial-gradient(rgba(255,255,255,0.045) 1px,transparent 1px);background-size:26px 26px;mask-image:radial-gradient(ellipse 100% 60% at 50% 0%,black,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 100% 60% at 50% 0%,black,transparent 75%)}
.ypp::after{content:'';position:absolute;inset:0;z-index:9998;pointer-events:none;opacity:0.022;mix-blend-mode:screen;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.ypp ::selection{background:var(--malachite);color:var(--bg)}
.ypp .mono{font-family:'Geist Mono',monospace;letter-spacing:0}
.ypp h1,.ypp h2,.ypp h3{font-family:'Bricolage Grotesque',sans-serif;color:var(--text);font-weight:700;margin:0}
.ypp h1{font-size:clamp(42px,6.6vw,82px);line-height:0.96;letter-spacing:-0.04em;font-weight:800}
.ypp h1 em{font-style:normal;color:var(--malachite)}
.ypp h2{font-size:clamp(32px,4.4vw,58px);line-height:1.0;letter-spacing:-0.035em}
.ypp h2 em{font-style:normal;color:var(--malachite)}
.ypp .container{max-width:1240px;margin:0 auto;padding:0 40px;position:relative;z-index:2}
@media(max-width:640px){.ypp .container{padding:0 20px}}
.ypp [data-reveal]{opacity:0;transform:translateY(26px);transition:opacity 0.85s var(--ease-out),transform 0.85s var(--ease-out)}
.ypp [data-reveal].in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.ypp [data-reveal]{opacity:1!important;transform:none!important}.ypp *{animation:none!important}}

.ypp .yp-nav{position:sticky;top:0;z-index:100;background:rgba(13,14,16,0.72);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid transparent;transition:border-color 300ms var(--ease),background 300ms var(--ease)}
.ypp .yp-nav.scrolled{border-bottom-color:var(--border);background:rgba(13,14,16,0.9)}
.ypp .yp-nav .nav-inner{max-width:1240px;margin:0 auto;padding:15px 40px;display:flex;align-items:center;justify-content:space-between}
@media(max-width:640px){.ypp .yp-nav .nav-inner{padding:13px 20px}}
.ypp .yp-nav .brand{display:flex;align-items:center;gap:10px;color:inherit;text-decoration:none}
.ypp .yp-nav .brand-mark{width:30px;height:30px;flex-shrink:0}.ypp .yp-nav .brand-mark svg{width:100%;height:100%;display:block}
.ypp .yp-nav .brand-word{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:21px;letter-spacing:-0.04em;color:var(--text);line-height:1}
.ypp .yp-nav .nav-links{display:flex;align-items:center;gap:30px}
.ypp .yp-nav .nav-anchor{font-size:14px;color:var(--text-2);display:none;text-decoration:none;transition:color 200ms var(--ease)}
.ypp .yp-nav .nav-anchor:hover{color:var(--text)}
@media(min-width:840px){.ypp .yp-nav .nav-anchor{display:inline}}
.ypp .yp-nav .nav-cta{display:inline-flex;align-items:center;gap:7px;font-family:'Geist',sans-serif;font-size:14px;font-weight:600;color:var(--bg);background:var(--malachite);padding:9px 18px;border-radius:8px;transition:all 220ms var(--ease);text-decoration:none}
.ypp .yp-nav .nav-cta:hover{background:#1AD478;transform:translateY(-1px);box-shadow:0 8px 24px -8px rgba(21,194,106,0.5)}

.ypp .hero{position:relative;padding:80px 0 96px;overflow:hidden}
@media(max-width:768px){.ypp .hero{padding:48px 0 68px}}
.ypp .hero-bg-orb{position:absolute;top:-18%;right:-8%;width:680px;height:680px;background:radial-gradient(circle,rgba(21,194,106,0.11) 0%,transparent 60%);pointer-events:none;z-index:0}
.ypp .hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr 0.95fr;gap:56px;align-items:center}
@media(max-width:940px){.ypp .hero-grid{grid-template-columns:1fr;gap:48px}}
.ypp .hero-badge{display:inline-flex;align-items:center;gap:9px;padding:6px 13px 6px 11px;background:var(--malachite-soft);border:1px solid var(--malachite-line);border-radius:999px;margin-bottom:26px}
.ypp .hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--malachite);box-shadow:0 0 0 3px rgba(21,194,106,0.18);animation:yp-pulse 2.4s ease-in-out infinite}
.ypp .hero-badge-text{font-family:'Geist Mono',monospace;font-size:11px;color:var(--malachite);text-transform:uppercase;letter-spacing:0.07em;font-weight:500}
.ypp .hero h1{margin-bottom:24px}
.ypp .hero-sub{font-size:clamp(16px,1.4vw,18.5px);color:var(--text-2);max-width:470px;line-height:1.6}
.ypp .hero-sub strong{color:var(--text);font-weight:600}
.ypp .hero-actions{margin-top:34px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.ypp .btn-primary{display:inline-flex;align-items:center;gap:9px;font-family:'Geist',sans-serif;font-weight:600;font-size:15px;color:var(--bg);background:var(--malachite);padding:14px 26px;border-radius:10px;transition:all 240ms var(--ease);text-decoration:none;border:none;cursor:pointer}
.ypp .btn-primary:hover{background:#1AD478;transform:translateY(-2px);box-shadow:0 16px 38px -12px rgba(21,194,106,0.55)}
.ypp .btn-ghost{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:500;color:var(--text-2);padding:14px 18px;border:1px solid var(--border-2);border-radius:10px;transition:all 240ms var(--ease);text-decoration:none;background:transparent;cursor:pointer}
.ypp .btn-ghost:hover{color:var(--text);border-color:var(--text-3);background:var(--surface)}
.ypp .hero-trust{margin-top:28px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-family:'Geist Mono',monospace;font-size:12px;color:var(--text-3)}
.ypp .hero-trust span{display:flex;align-items:center;gap:7px}
.ypp .hero-trust .tick{color:var(--malachite)}

.ypp .chat-wrap{position:relative}
.ypp .chat-mock{position:relative;z-index:2;background:var(--surface);border:1px solid var(--border-2);border-radius:22px;overflow:hidden;box-shadow:0 50px 120px -40px rgba(0,0,0,0.85);max-width:412px;margin-left:auto}
@media(max-width:940px){.ypp .chat-mock{margin:0 auto}}
.ypp .chat-header{display:flex;align-items:center;gap:12px;padding:15px 18px;background:var(--surface-2);border-bottom:1px solid var(--border)}
.ypp .chat-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#2A2B31,#16171B);border:1px solid var(--border-2);display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:17px;color:var(--malachite);flex-shrink:0}
.ypp .chat-meta{flex:1;min-width:0}
.ypp .chat-name{font-weight:600;font-size:15px;color:var(--text);line-height:1.2}
.ypp .chat-status{font-family:'Geist Mono',monospace;font-size:11px;color:var(--text-3);display:flex;align-items:center;gap:6px;margin-top:2px}
.ypp .chat-status .dot{width:6px;height:6px;border-radius:50%;background:var(--malachite);animation:yp-pulse 2s ease-in-out infinite}
.ypp .chat-tag{font-family:'Geist Mono',monospace;font-size:10px;color:var(--text-3);border:1px solid var(--border);border-radius:5px;padding:3px 7px;letter-spacing:0.04em}
.ypp .chat-body{padding:20px 18px;display:flex;flex-direction:column;gap:10px;background:var(--bg);height:392px;overflow:hidden;justify-content:flex-end}
.ypp .msg{max-width:80%;font-size:14px;line-height:1.45;padding:10px 13px;border-radius:14px;animation:yp-msgIn 0.4s var(--ease-out) both}
.ypp .msg.in{align-self:flex-start;background:var(--surface-2);color:var(--text);border-bottom-left-radius:5px}
.ypp .msg.out{align-self:flex-end;background:var(--malachite);color:#06210F;border-bottom-right-radius:5px;font-weight:500}
.ypp .msg-tag{display:block;font-family:'Geist Mono',monospace;font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;opacity:0.85}
.ypp .msg.out .msg-tag{color:#06210F}
.ypp .msg.human{align-self:flex-end;background:var(--surface-3);color:var(--text);border-bottom-right-radius:5px;border:1px solid var(--border-2)}
.ypp .msg.human .msg-tag{color:var(--blue)}
.ypp .chat-system{align-self:center;font-family:'Geist Mono',monospace;font-size:10.5px;color:var(--amber);background:rgba(229,161,58,0.1);border:1px solid rgba(229,161,58,0.22);border-radius:999px;padding:5px 12px;letter-spacing:0.02em;animation:yp-msgIn 0.4s var(--ease-out) both}
.ypp .chat-amount{font-family:'Geist Mono',monospace;font-weight:600}
.ypp .typing{align-self:flex-start;background:var(--surface-2);border-bottom-left-radius:5px;padding:13px 15px;border-radius:14px;display:flex;gap:4px;animation:yp-msgIn 0.3s var(--ease-out) both}
.ypp .typing.out{align-self:flex-end;background:var(--malachite);border-bottom-right-radius:5px;border-bottom-left-radius:14px}
.ypp .typing span{width:6px;height:6px;border-radius:50%;background:var(--text-3);animation:yp-typingDot 1.2s infinite}
.ypp .typing.out span{background:#06210F;opacity:0.6}
.ypp .typing span:nth-child(2){animation-delay:0.18s}.ypp .typing span:nth-child(3){animation-delay:0.36s}
.ypp .chat-input{display:flex;align-items:center;gap:10px;padding:13px 16px;background:var(--surface-2);border-top:1px solid var(--border)}
.ypp .chat-input-field{flex:1;font-size:13px;color:var(--text-3);background:var(--bg);border:1px solid var(--border);border-radius:999px;padding:9px 15px}
.ypp .chat-send{width:34px;height:34px;border-radius:50%;background:var(--malachite);display:flex;align-items:center;justify-content:center;color:var(--bg);font-size:15px;flex-shrink:0}
.ypp .chat-float{position:absolute;z-index:3;background:var(--surface-2);border:1px solid var(--border-2);border-radius:12px;padding:11px 14px;box-shadow:0 20px 50px -20px rgba(0,0,0,0.8);display:flex;align-items:center;gap:10px}
.ypp .chat-float-1{top:-24px;left:-34px;animation:yp-floatY 5s ease-in-out infinite}
@media(max-width:940px){.ypp .chat-float-1{left:-6px}}
@media(max-width:520px){.ypp .chat-float{display:none}}
.ypp .cf-icon{width:30px;height:30px;border-radius:8px;background:var(--malachite-soft);border:1px solid var(--malachite-line);display:flex;align-items:center;justify-content:center;color:var(--malachite);font-size:14px;flex-shrink:0}
.ypp .cf-text{font-size:12px}.ypp .cf-title{color:var(--text);font-weight:600;line-height:1.2}.ypp .cf-sub{font-family:'Geist Mono',monospace;font-size:10px;color:var(--text-3)}
@keyframes yp-msgIn{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:none}}
@keyframes yp-typingDot{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-4px);opacity:1}}
@keyframes yp-floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes yp-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(21,194,106,0.4)}50%{opacity:0.7;box-shadow:0 0 0 4px rgba(21,194,106,0)}}

.ypp .section{position:relative;padding:120px 0}
@media(max-width:768px){.ypp .section{padding:78px 0}}
.ypp .section-eyebrow{font-family:'Geist Mono',monospace;font-size:12px;color:var(--malachite);font-weight:500;text-transform:uppercase;letter-spacing:0.09em;display:flex;align-items:center;gap:10px;margin-bottom:22px}
.ypp .section-eyebrow::before{content:'';width:24px;height:1px;background:var(--malachite)}
.ypp .section-head{max-width:680px;margin-bottom:60px}
.ypp .section-head.center{margin-left:auto;margin-right:auto;text-align:center}
.ypp .section-head.center .section-eyebrow{justify-content:center}
.ypp .section-head h2{margin-bottom:18px}
.ypp .section-head p{font-size:17.5px;color:var(--text-2);line-height:1.6;margin:0}

.ypp .flood-sec{background:var(--surface);overflow:hidden}
.ypp .flood-head{max-width:640px;margin-bottom:8px}
.ypp .flood-head h2{margin-bottom:18px}
.ypp .flood-head .lead{font-size:17.5px;color:var(--text-2);line-height:1.6;margin:0}
.ypp .flood{position:relative;margin:48px 0 36px;display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;max-width:860px}
.ypp .flood-msg{position:relative;background:var(--bg);border:1px solid var(--border);border-radius:14px;border-bottom-left-radius:5px;padding:13px 16px;font-size:14.5px;color:var(--text);box-shadow:0 14px 30px -18px rgba(0,0,0,0.6)}
.ypp .flood-msg .t{display:block;font-family:'Geist Mono',monospace;font-size:10px;color:var(--text-3);margin-top:6px}
.ypp .flood-msg:nth-child(1){transform:rotate(-1.5deg)}
.ypp .flood-msg:nth-child(2){transform:rotate(1deg) translateY(6px)}
.ypp .flood-msg:nth-child(3){transform:rotate(-0.5deg)}
.ypp .flood-msg:nth-child(4){transform:rotate(1.6deg)}
.ypp .flood-msg:nth-child(5){transform:rotate(-1.2deg) translateY(4px)}
.ypp .flood-msg:nth-child(6){transform:rotate(0.8deg)}
.ypp .flood-msg:nth-child(7){transform:rotate(-1deg)}
.ypp .flood-msg.urgent{border-color:rgba(239,68,68,0.3);color:#FCA5A5}
.ypp .flood-unread{display:inline-flex;align-items:center;gap:8px;align-self:center;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:#F87171;font-family:'Geist Mono',monospace;font-size:13px;padding:11px 16px;border-radius:14px;font-weight:500}
.ypp .flood-caption{font-size:18px;color:var(--text);line-height:1.6;max-width:620px;font-weight:500;margin:0}
.ypp .flood-caption b{color:var(--malachite);font-weight:600}

.ypp .thread{position:relative;max-width:760px;margin:0 auto;padding-left:42px}
@media(max-width:560px){.ypp .thread{padding-left:30px}}
.ypp .thread::before{content:'';position:absolute;left:14px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,var(--malachite),var(--malachite-line),transparent)}
@media(max-width:560px){.ypp .thread::before{left:8px}}
.ypp .thread-step{position:relative;padding-bottom:42px}
.ypp .thread-step:last-child{padding-bottom:0}
.ypp .thread-node{position:absolute;left:-42px;top:0;width:30px;height:30px;border-radius:50%;background:var(--surface);border:1px solid var(--malachite-line);color:var(--malachite);font-family:'Geist Mono',monospace;font-size:12px;font-weight:500;display:flex;align-items:center;justify-content:center}
@media(max-width:560px){.ypp .thread-node{left:-30px;width:24px;height:24px;font-size:11px}}
.ypp .thread-step h3{font-size:24px;color:var(--text);margin-bottom:10px;letter-spacing:-0.025em}
.ypp .thread-step p{font-size:15.5px;color:var(--text-2);line-height:1.6;max-width:540px;margin:0}
.ypp .thread-step .meta{margin-top:12px;font-family:'Geist Mono',monospace;font-size:11px;color:var(--malachite);text-transform:uppercase;letter-spacing:0.06em}

.ypp .feat-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
@media(max-width:860px){.ypp .feat-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.ypp .feat-grid{grid-template-columns:1fr}}
.ypp .feat{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:28px 26px;grid-column:span 2;transition:transform 380ms var(--ease-out),border-color 380ms var(--ease)}
.ypp .feat.wide{grid-column:span 3}
.ypp .feat.tall{grid-column:span 3}
@media(max-width:860px){.ypp .feat,.ypp .feat.wide,.ypp .feat.tall{grid-column:span 1}}
.ypp .feat:hover{transform:translateY(-4px);border-color:var(--malachite-line)}
.ypp .feat-marker{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;padding:0 9px;border-radius:9px;border-bottom-left-radius:4px;background:var(--malachite-soft);border:1px solid var(--malachite-line);color:var(--malachite);font-family:'Geist Mono',monospace;font-size:12px;font-weight:500;margin-bottom:20px}
.ypp .feat h3{font-size:20px;color:var(--text);margin-bottom:9px;letter-spacing:-0.02em}
.ypp .feat p{font-size:14.5px;color:var(--text-2);line-height:1.55;margin:0}
.ypp .feat-mini{margin-top:20px;display:flex;flex-direction:column;gap:7px}
.ypp .feat-mini .mm{font-size:12.5px;padding:7px 11px;border-radius:9px;max-width:75%}
.ypp .feat-mini .mm.in{background:var(--surface-2);color:var(--text);align-self:flex-start;border-bottom-left-radius:3px}
.ypp .feat-mini .mm.out{background:var(--malachite);color:#06210F;align-self:flex-end;border-bottom-right-radius:3px;font-weight:500}

.ypp .handoff{background:var(--surface);position:relative;overflow:hidden}
.ypp .handoff-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
@media(max-width:900px){.ypp .handoff-grid{grid-template-columns:1fr;gap:44px}}
.ypp .handoff h2{margin-bottom:22px}
.ypp .handoff-lead{font-size:17.5px;color:var(--text-2);line-height:1.6;margin-bottom:30px}
.ypp .handoff-list{display:flex;flex-direction:column;gap:18px}
.ypp .handoff-item{display:flex;gap:15px;align-items:flex-start}
.ypp .handoff-item-marker{width:30px;height:30px;border-radius:9px;border-bottom-left-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Geist Mono',monospace;font-size:12px;font-weight:500}
.ypp .hm-ai{background:var(--malachite-soft);border:1px solid var(--malachite-line);color:var(--malachite)}
.ypp .hm-amber{background:rgba(229,161,58,0.1);border:1px solid rgba(229,161,58,0.25);color:var(--amber)}
.ypp .hm-blue{background:rgba(91,155,213,0.1);border:1px solid rgba(91,155,213,0.25);color:var(--blue)}
.ypp .handoff-item-body h4{font-size:16px;color:var(--text);font-weight:600;margin-bottom:4px;letter-spacing:-0.01em}
.ypp .handoff-item-body p{font-size:14.5px;color:var(--text-2);line-height:1.55;margin:0}
.ypp .queue-mock{background:var(--bg);border:1px solid var(--border-2);border-radius:20px;overflow:hidden;box-shadow:0 40px 100px -40px rgba(0,0,0,0.75)}
.ypp .queue-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--border)}
.ypp .queue-title{font-weight:600;color:var(--text);font-size:15px}
.ypp .queue-count{font-family:'Geist Mono',monospace;font-size:11px;color:var(--amber);background:rgba(229,161,58,0.1);border:1px solid rgba(229,161,58,0.22);border-radius:999px;padding:3px 10px}
.ypp .queue-list{padding:10px}
.ypp .queue-row{display:flex;align-items:center;gap:13px;padding:14px;border-radius:12px;transition:background 200ms var(--ease)}
.ypp .queue-row:hover{background:var(--surface)}
.ypp .queue-row+.queue-row{border-top:1px solid var(--border)}
.ypp .queue-av{width:36px;height:36px;border-radius:50%;background:var(--surface-2);border:1px solid var(--border-2);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;color:var(--text-2);flex-shrink:0}
.ypp .queue-info{flex:1;min-width:0}
.ypp .queue-name{font-size:14px;color:var(--text);font-weight:500;line-height:1.2}
.ypp .queue-reason{font-size:12px;color:var(--text-3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ypp .queue-badge{font-family:'Geist Mono',monospace;font-size:10px;padding:3px 8px;border-radius:6px;flex-shrink:0;letter-spacing:0.03em}
.ypp .qb-amber{background:rgba(229,161,58,0.12);color:var(--amber)}
.ypp .qb-blue{background:rgba(91,155,213,0.12);color:var(--blue)}
.ypp .qb-teal{background:rgba(45,212,191,0.12);color:var(--teal)}

.ypp .dash-section{position:relative;overflow:hidden}
.ypp .dash-section .section-head{margin-left:auto;margin-right:auto;text-align:center}
.ypp .dash-section .section-eyebrow{justify-content:center}
.ypp .dash-frame{background:var(--surface);border:1px solid var(--border-2);border-radius:20px;overflow:hidden;box-shadow:0 60px 140px -50px rgba(0,0,0,0.9);max-width:1080px;margin:0 auto}
.ypp .dash-bar{display:flex;align-items:center;gap:8px;padding:13px 18px;background:var(--surface-2);border-bottom:1px solid var(--border)}
.ypp .dash-dot{width:11px;height:11px;border-radius:50%;background:#3A3B40}
.ypp .dash-url{margin-left:14px;font-family:'Geist Mono',monospace;font-size:11px;color:var(--text-3);background:var(--bg);border:1px solid var(--border);border-radius:7px;padding:5px 13px}
.ypp .dash-body{display:grid;grid-template-columns:64px 1fr;min-height:440px}
@media(max-width:640px){.ypp .dash-body{grid-template-columns:1fr}}
.ypp .dash-side{background:var(--surface-2);border-right:1px solid var(--border);padding:18px 0;display:flex;flex-direction:column;align-items:center;gap:8px}
@media(max-width:640px){.ypp .dash-side{display:none}}
.ypp .dash-side-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--text-3)}
.ypp .dash-side-icon.active{background:var(--malachite-soft);color:var(--malachite)}
.ypp .dash-side-icon svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.6}
.ypp .dash-main{padding:24px 26px}
@media(max-width:640px){.ypp .dash-main{padding:20px}}
.ypp .dash-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:12px}
.ypp .dash-h-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:22px;color:var(--text);letter-spacing:-0.025em}
.ypp .dash-h-sub{font-family:'Geist Mono',monospace;font-size:11px;color:var(--text-3)}
.ypp .dash-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px}
@media(max-width:760px){.ypp .dash-kpis{grid-template-columns:repeat(2,1fr)}}
.ypp .kpi{background:var(--bg);border:1px solid var(--border);border-radius:13px;padding:16px}
.ypp .kpi.feature{background:var(--malachite-soft);border-color:var(--malachite-line)}
.ypp .kpi-label{font-family:'Geist Mono',monospace;font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:9px}
.ypp .kpi.feature .kpi-label{color:var(--malachite-2)}
.ypp .kpi-val{font-family:'Geist Mono',monospace;font-weight:500;font-size:23px;color:var(--text);letter-spacing:-0.02em}
.ypp .kpi.feature .kpi-val{color:var(--malachite)}
.ypp .kpi-trend{font-family:'Geist Mono',monospace;font-size:10px;color:var(--malachite);margin-top:5px}
.ypp .dash-row{display:grid;grid-template-columns:1.6fr 1fr;gap:12px}
@media(max-width:760px){.ypp .dash-row{grid-template-columns:1fr}}
.ypp .dash-panel{background:var(--bg);border:1px solid var(--border);border-radius:13px;overflow:hidden}
.ypp .dash-panel-h{padding:14px 16px;border-bottom:1px solid var(--border);font-size:13px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:8px}
.ypp .dash-panel-h .mono{margin-left:auto;font-size:10px;color:var(--text-3)}
.ypp .ord{display:flex;align-items:center;gap:12px;padding:11px 16px;font-size:13px}
.ypp .ord+.ord{border-top:1px solid var(--border)}
.ypp .ord-id{font-family:'Geist Mono',monospace;font-size:11px;color:var(--text-3);width:54px;flex-shrink:0}
.ypp .ord-name{color:var(--text);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ypp .ord-amt{font-family:'Geist Mono',monospace;font-size:12px;color:var(--text);font-weight:500}
.ypp .ord-badge{font-family:'Geist Mono',monospace;font-size:9.5px;padding:3px 7px;border-radius:5px;flex-shrink:0;width:74px;text-align:center}
.ypp .b-paid{background:rgba(21,194,106,0.12);color:var(--malachite)}
.ypp .b-pending{background:rgba(229,161,58,0.12);color:var(--amber)}
.ypp .b-shipped{background:rgba(91,155,213,0.12);color:var(--blue)}
.ypp .b-delivered{background:rgba(45,212,191,0.12);color:var(--teal)}
.ypp .hq{padding:11px 16px;display:flex;align-items:center;gap:11px}
.ypp .hq+.hq{border-top:1px solid var(--border)}
.ypp .hq-info{flex:1;min-width:0}
.ypp .hq-name{font-size:12.5px;color:var(--text);line-height:1.2}
.ypp .hq-reason{font-size:10.5px;color:var(--text-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.ypp .hq-dot{width:7px;height:7px;border-radius:50%;background:var(--amber);flex-shrink:0}
.ypp .dash-cta{text-align:center;margin-top:34px}

.ypp .faq{background:var(--surface)}
.ypp .faq-grid{max-width:820px;margin:0 auto}
.ypp .faq-item{border-bottom:1px solid var(--border);padding:26px 0}
.ypp .faq-item:first-child{border-top:1px solid var(--border)}
.ypp .faq-q{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:19px;color:var(--text);letter-spacing:-0.02em;margin-bottom:11px}
.ypp .faq-a{font-size:15.5px;color:var(--text-2);line-height:1.6;max-width:680px}

.ypp .cta{position:relative;overflow:hidden;text-align:center;padding:140px 0}
@media(max-width:768px){.ypp .cta{padding:90px 0}}
.ypp .cta-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:900px;height:900px;background:radial-gradient(circle,rgba(21,194,106,0.1) 0%,transparent 55%);pointer-events:none}
.ypp .cta-inner{position:relative;z-index:2;max-width:700px;margin:0 auto}
.ypp .cta h2{margin-bottom:20px;font-size:clamp(36px,5.4vw,64px)}
.ypp .cta p{font-size:18px;color:var(--text-2);margin-bottom:38px;line-height:1.6;margin-top:0}
.ypp .cta-actions{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}
.ypp .cta-note{margin-top:24px;font-family:'Geist Mono',monospace;font-size:12px;color:var(--text-3)}

.ypp footer{border-top:1px solid var(--border);padding:48px 0 40px}
.ypp .footer-inner{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:28px}
.ypp .footer-brand-mark{width:30px;height:30px;margin-bottom:14px}.ypp .footer-brand-mark svg{width:100%;height:100%;display:block}
.ypp .footer-by{font-size:13.5px;color:var(--text-3);line-height:1.6;max-width:280px}
.ypp .footer-by a{color:var(--malachite);font-weight:500;text-decoration:none}.ypp .footer-by a:hover{color:#1AD478}
.ypp .footer-links{display:flex;gap:48px;flex-wrap:wrap}
.ypp .footer-col-h{font-family:'Geist Mono',monospace;font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:14px}
.ypp .footer-col a{display:block;font-size:14px;color:var(--text-2);margin-bottom:9px;text-decoration:none}
.ypp .footer-col a:hover{color:var(--text)}
.ypp .footer-bottom{margin-top:44px;padding-top:24px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;font-family:'Geist Mono',monospace;font-size:11px;color:var(--text-3)}

.ypp .proof{border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--surface)}
.ypp .proof-inner{display:grid;grid-template-columns:repeat(3,1fr)}
@media(max-width:680px){.ypp .proof-inner{grid-template-columns:1fr}}
.ypp .proof-item{padding:30px 26px;text-align:center;border-right:1px solid var(--border)}
.ypp .proof-item:last-child{border-right:none}
@media(max-width:680px){.ypp .proof-item{border-right:none;border-bottom:1px solid var(--border);padding:24px}.ypp .proof-item:last-child{border-bottom:none}}
.ypp .proof-val{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:25px;color:var(--malachite);letter-spacing:-0.03em;line-height:1}
.ypp .proof-label{margin-top:9px;font-size:14px;color:var(--text-2);line-height:1.45}

.ypp .cta-band{padding:60px 0;border-top:1px solid var(--border);background:var(--surface)}
.ypp .cta-band-inner{display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap}
.ypp .cta-band-text h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:clamp(23px,3vw,33px);color:var(--text);letter-spacing:-0.03em;line-height:1.06}
.ypp .cta-band-text p{margin-top:9px;font-size:15px;color:var(--text-2);max-width:440px}
.ypp .cta-band-actions{display:flex;gap:12px;flex-wrap:wrap}

.ypp .pricing{position:relative;overflow:hidden}
.ypp .price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch}
@media(max-width:900px){.ypp .price-grid{grid-template-columns:1fr;max-width:430px;margin:0 auto}}
.ypp .price-card{position:relative;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:32px 28px;transition:transform 380ms var(--ease-out),border-color 380ms var(--ease)}
.ypp .price-card:hover{transform:translateY(-4px);border-color:var(--border-2)}
.ypp .price-card.featured{border-color:var(--malachite-line);background:linear-gradient(180deg,var(--malachite-soft),var(--surface) 40%)}
.ypp .price-card.featured:hover{border-color:var(--malachite)}
.ypp .price-pop{position:absolute;top:-11px;left:50%;transform:translateX(-50%);font-family:'Geist Mono',monospace;font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.07em;color:var(--bg);background:var(--malachite);padding:5px 12px;border-radius:999px;white-space:nowrap}
.ypp .price-name{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:20px;color:var(--text);letter-spacing:-0.02em}
.ypp .price-desc{font-size:13.5px;color:var(--text-3);margin-top:6px;line-height:1.45;min-height:40px}
.ypp .price-amount{display:flex;align-items:baseline;gap:5px;margin:20px 0 2px}
.ypp .price-amount .amt{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:40px;color:var(--text);letter-spacing:-0.035em;line-height:1}
.ypp .price-amount .per{font-family:'Geist Mono',monospace;font-size:13px;color:var(--text-3)}
.ypp .price-features{list-style:none;margin:22px 0 0;padding:22px 0 0;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:12px;flex:1}
.ypp .price-features li{position:relative;padding-left:25px;font-size:14px;color:var(--text-2);line-height:1.45}
.ypp .price-features li::before{content:'✓';position:absolute;left:0;top:0;color:var(--malachite);font-weight:700}
.ypp .price-features li.lead{color:var(--text);font-weight:500}
.ypp .price-features li.lead::before{content:'★';font-size:12px}
.ypp .price-card .price-btn{width:100%;justify-content:center;margin-top:24px}
.ypp .price-foot{text-align:center;margin-top:34px;font-family:'Geist Mono',monospace;font-size:12px;color:var(--text-3)}
`
