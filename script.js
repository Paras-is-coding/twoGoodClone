
    function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

    }
    locomotiveAnimation()
    
    function navbarAnimation(){
        gsap.to("#nav-left svg",{
            transform:'translateY(-100%)',
            scrollTrigger:{
                trigger:"#page1",
                scroller:"#main",
                start:"top 0",
                end:"top -5%",
                scrub:true
            }
        })
        gsap.to("#nav-right #links",{
            transform:'translateY(-100%)',
            opacity:0,
            scrollTrigger:{
                trigger:"#page1",
                scroller:"#main",
                start:"top 0",
                end:"top -5%",
                scrub:true
            }
        })
        
    }
    navbarAnimation();
    
    function videoAnimation(){
        let playbtn = document.querySelector("#play");
        let videoCon = document.querySelector("#video-container");
        
        videoCon.addEventListener("mouseenter",()=>{
           gsap.to(playbtn,{
            opacity:1,
            scale:1,
            duration:.5
           })
        })
        videoCon.addEventListener("mouseleave",()=>{
            gsap.to(playbtn,{
                opacity:0,
                scale:0,
                duration:.5
            })
        })
        videoCon.addEventListener("mousemove",(e)=>{
            gsap.to(playbtn,{
                left : e.clientX - videoCon.getBoundingClientRect().left,
                top : e.clientY - videoCon.getBoundingClientRect().top
            })
        })
    }
    videoAnimation();

    function loadingAnimation(){
        gsap.from("#page1 h1",{
            y:100,
            delay:0.1,
            duration:0.4,
            opacity:0,
            stagger:0.1
        })
        gsap.from("#page1 #video-container",{
            scale:0.8,
            delay:0.2,
            duration:1,
            opacity:0
        })
    }
    loadingAnimation();

   function cursorAnimation(){
    
    // let cursor = document.getElementById("cursor");
    // document.addEventListener("mousemove",(e)=>{
    //     gsap.to(cursor,{
    //         left:e.x,
    //         top:e.y
    //     })
    // })
    // document.querySelectorAll(".child").forEach((child)=>{
    //     child.addEventListener("mouseenter",()=>{
    //         gsap.to(cursor,{
    //             transform: 'translate(-50%,-50%) scale(1)'
    //         })
    //     });
    //     child.addEventListener("mouseout",()=>{
    //         gsap.to(cursor,{
    //             transform: 'translate(-50%,-50%) scale(0)'
    //         })
    //     });
    // })
    // Select the cursor element outside of the forEach loop
const cursor = document.getElementById("cursor");

document.querySelectorAll(".child").forEach((child) => {
    child.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
            transform: 'translate(-50%,-50%) scale(1)'
        });
    });
    child.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
            transform: 'translate(-50%,-50%) scale(0)'
        });
    });
});

document.addEventListener("mousemove", (e) => {
    // Move the cursor element using gsap.to
    gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY
    });
});

// // Prevent cursor from interfering with scrolling   <- this was causing problem **
cursor.style.pointerEvents = "none";
   
   }
   cursorAnimation();