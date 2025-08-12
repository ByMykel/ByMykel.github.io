let incrTick = 0, 
    interactionTimeout,
    yTo,
    scaleTo,
    isMobile = window.innerWidth <= 600 ? true : false

window.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector('.mwg_effect019 .content')
    const half = content.getBoundingClientRect().height / 2
    const wrap = gsap.utils.wrap(-half, 0)

    yTo = gsap.quickTo(content, "y", {
        duration: 1, // Will vary over 1s
        ease:'power4', // Non-linear
        modifiers: {
            y: gsap.utils.unitize(wrap)
        },
    })
    scaleTo = gsap.quickTo('.mwg_effect019 .container', "scaleY", {
        duration: 0.6, // Will vary over 0.6s
        ease:'power4' // Non-linear
    })

    Observer.create({
        target: window, // Capture events on the window
        type: "wheel,pointer,touch", // Types of events to listen for
        onChange: handleInteraction, // We use onChange to listen for all events
    })

    gsap.ticker.add(tick)
})

function handleInteraction(e) {
    if(e.event.type === "wheel") incrTick -= e.deltaY 
    else incrTick += e.deltaY // Value for yTo() on the content division

    if(isMobile) return
    
    // Returns a value between 0.8 and 1.2
    const valSc = 1 - gsap.utils.clamp(-0.2, 0.2, e.deltaY/300)
    scaleTo(valSc) // scaleTo() on the container division
  
    window.clearTimeout( interactionTimeout ) // Kill setTimeout
    interactionTimeout = setTimeout( () => { // Init setTimeout
        if(scaleTo.length !== 0) scaleTo(1)
    }, 66)
}

function tick(time, dt) {
    incrTick += dt / 30 // Adjust the speed of automatic scrolling
    yTo(incrTick)
}