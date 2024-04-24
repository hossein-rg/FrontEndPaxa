import React from "react";
import Particles from "react-tsparticles";
import { useState } from "react";
import { loadFull } from "tsparticles";
// class ParticlesComponent extends React.Component {
//   render() {
//     const particlesInit = async (main) => {
//       console.log(main);
//       await loadFull(main);
//     };
//     return (
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           background: {
//             color: {
//               value: "rgb(25, 25, 25)",
//             },
//           },
//           particles: {
//             number: {
//               value: 160,
//               density: {
//                 enable: true,
//                 value_area: 800,
//               },
//             },
//             color: {
//               value: "#ffffff",
//             },
//             shape: {
//               type: "circle",
//               stroke: {
//                 width: 0,
//                 color: "#000000",
//               },
//               polygon: {
//                 nb_sides: 5,
//               },
//               image: {
//                 src: "",
//                 width: 100,
//                 height: 100,
//               },
//             },
//             opacity: {
//               value: 0.5,
//               random: true,
//               anim: {
//                 enable: true,
//                 speed: 1,
//                 opacity_min: 0.1,
//                 sync: false,
//               },
//             },
//             size: {
//               value: 3,
//               random: true,
//               anim: {
//                 enable: false,
//                 speed: 4,
//                 size_min: 0.3,
//                 sync: false,
//               },
//             },
//             line_linked: {
//               enable: false,
//               distance: 150,
//               color: "#ffffff",
//               opacity: 0.4,
//               width: 1,
//             },
//             move: {
//               enable: true,
//               speed: 1,
//               direction: "none",
//               random: true,
//               straight: true,
//               out_mode: "out",
//               bounce: false,
//               attract: {
//                 enable: false,
//                 rotateX: 600,
//                 rotateY: 1200,
//               },
//             },
//           },
//           interactivity: {
//             detectsOn: "canvas",
//             events: {
//               onHover: {
//                 enable: true,
//                 mode: "grab",
//               },
//               onClick: {
//                 enable: true,
//                 mode: "push",
//               },
//               resize: true,
//             },
//             modes: {
//               grab: {
//                 distance: 140,
//                 line_linked: {
//                   opacity: 1,
//                 },
//               },
//               bubble: {
//                 distance: 400,
//                 size: 40,
//                 duration: 2,
//                 opacity: 8,
//                 speed: 3,
//               },
//               repulse: {
//                 distance: 200,
//                 duration: 0.4,
//               },
//               push: {
//                 particles_nb: 4,
//               },
//               remove: {
//                 particles_nb: 2,
//               },
//             },
//           },
//           retina_detect: true,
//         }}
//       />
//     );
//   }
// }

// export default ParticlesComponent;
function ParticlesComponent() {
  const [particleCount, setParticleCount] = useState(20);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = async (container) => {
    // await loadFull(container);
  };

  // const handleParticlesClick = (event) => {
  //   setParticleCount(particleCount);
  // };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },
        particles: {
          number: {
            value: particleCount,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#fff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 4,
            },
            image: {
              src: "",
              width: 60,
              height: 60,
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: false,
              speed: 4,
              size_min: 0.3,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffb700",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "random",
            random: true,
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 300,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 100,
              size: 1,
              duration: 1,
              opacity: 1,
              speed: 1,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 15,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default ParticlesComponent;
