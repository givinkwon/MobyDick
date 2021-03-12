import React from 'react';
import styled, {css} from 'styled-components';

class Test extends React.Component{
  render(){
    return(
      <>
        <Box>dfaf</Box>
        
      </>
    )
  }
}

export default Test

const Box = styled.div`
// Center & dribbble
  width: 500px;

  font-family: 'Mukta Malar', Arial;
  line-height: 22px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  transition: background .3s ease;
  background: red;
 
  .switch {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translate(-50%, 0);
  }
  .dropdown {
      margin-top: 60px;
  }
  // .dribbble {
  //     position: fixed;
  //     display: block;
  //     right: 20px;
  //     bottom: 20px;
  //     img {
  //         display: block;
  //         height: 28px;
  //     }
  // }



.dropdown {
  --max-scroll: 8;
  --text: #3F4656;
  --border: #2F3545;
  --borderActive: #23C4F8;
  --background: #151924;
  --arrow: #6C7486;
  --arrowActive: #E4ECFA;
  --listText: #99A3BA;
  --listBackground: #F5F9FF;
  --listActive: #E4ECFA;
  --listTextActive: #6C7486;
  --listBorder: none;
  --textFilled: #99A3BA;

  width: 220px;
  position: relative;
  select {
      display: none;
  }
}

//   & > span {
//       cursor: pointer;
//       padding: 9px 16px;
//       border-radius: 6px;
//       display: block;
//       position: relative;
//       color: var(--text);
//       border: 1px solid var(--border);
//       background: var(--background);
//       transition: all .3s ease;
//       &:before,
//       &:after {
//           content: '';
//           display: block;
//           position: absolute;
//           width: 8px;
//           height: 2px;
//           border-radius: 1px;
//           top: 50%;
//           right: 15px;
//           background: var(--arrow);
//           transition: all .3s ease;
//       }
//       &:before {
//           margin-right: 4px;
//           transform: scale(.96, .8) rotate(50deg);
//       }
//       &:after {
//           transform: scale(.96, .8) rotate(-50deg);
//       }
//   }
//   ul {
//       margin: 0;
//       padding: 0;
//       list-style: none;
//       opacity: 0;
//       visibility: hidden;
//       position: absolute;
//       max-height: calc(var(--max-scroll) * 42px);
//       top: 42px;
//       left: 0;
//       z-index: 1;
//       right: 0;
//       background: var(--listBackground);
//       border-radius: 6px;
//       overflow-x: hidden;
//       overflow-y: auto;
//       transform-origin: 0 0;
//       transition: opacity .2s ease, visibility .2s ease, transform .3s cubic-bezier(.4, .6, .5, 1.32);
//       transform: scale(.8) translate(0, 4px);
//       border: 1px solid var(--listBorder);
//       li {
//           opacity: 0;
//           transform: translate(6px, 0);
//           transition: all .3s ease;
//           a {
//               cursor: pointer;
//               display: block;
//               padding: 10px 16px;
//               color: var(--listText);
//               text-decoration: none;
//               outline: none;
//               position: relative;
//               transition: all .3s ease;
//               &:hover {
//                   color: var(--listTextActive);
//               }
//           }
//           &.active {
//               a {
//                   color: var(--listTextActive);
//                   background: var(--listActive);
//                   &:before,
//                   &:after {
//                       --scale: .6;
//                       content: '';
//                       display: block;
//                       width: 10px;
//                       height: 2px;
//                       position: absolute;
//                       right: 17px;
//                       top: 50%;
//                       opacity: 0;
//                       background: var(--listText);
//                       transition: all .2s ease;
//                   }
//                   &:before {
//                       transform: rotate(45deg) scale(var(--scale));
//                   }
//                   &:after {
//                       transform: rotate(-45deg) scale(var(--scale));
//                   }
//                   &:hover {
//                       &:before,
//                       &:after {
//                           --scale: .9;
//                           opacity: 1;
//                       }
//                   }
//               }
//           }
//           &:first-child {
//               a {
//                   border-radius: 6px 6px 0 0;
//               }
//           }
//           &:last-child {
//               a {
//                   border-radius: 0 0 6px 6px;
//               }
//           }
//       }
//   }
//   &.filled {
//       & > span {
//           color: var(--textFilled);
//       }
//   }
//   &.open {
//       & > span {
//           border-color: var(--borderActive);
//           &:before,
//           &:after {
//               background: var(--arrowActive);
//           }
//           &:before {
//               transform: scale(.96, .8) rotate(-50deg);
//           }
//           &:after {
//               transform: scale(.96, .8) rotate(50deg);
//           }
//       }
//       ul {
//           opacity: 1;
//           visibility: visible;
//           transform: scale(1) translate(0, 12px);
//           transition: opacity .3s ease, visibility .3s ease, transform .3s cubic-bezier(.4, .6, .5, 1.32);
//           li {
//               opacity: 1;
//               transform: translate(0, 0);
//               $i: 1;
//               @while $i <= 10 {
//                   $delay: $i * 80;
//                   &:nth-child(#{$i}) {
//                       transition-delay: #{$delay}ms;
//                   }
//                   $i: $i + 1;
//               }
//           }
//       }
//   }
// }

// select {
//   --text: #3F4656;
//   --border: #2F3545;
//   --background: #151924;
//   &.dropdown {
//       padding: 9px 16px;
//       border-radius: 6px;
//       color: var(--text);
//       border: 1px solid var(--border);
//       background: var(--background);
//       line-height: 22px;
//       font-size: 16px;
//       font-family: inherit;
//       -webkit-appearance: none;
//   }
// }

// html {
//   box-sizing: border-box;
//   -webkit-font-smoothing: antialiased;
// }

// * {
//   box-sizing: inherit;
//   &:before,
//   &:after {
//       box-sizing: inherit;
//   }
// }

// switch

.switch {
  height: 20px;
  display: block;
  position: relative;
  cursor: pointer;
  input {
      display: none;
      & + span {
          padding-left: 38px;
          min-height: 20px;
          line-height: 20px;
          display: block;
          color: #3F4656;
          position: relative;
          white-space: nowrap;
          &:not(:empty) {
              padding-left: 38px + 8;
          }
          &:before,
          &:after {
              content: '';
              display: block;
              position: absolute;
              border-radius: 10px;
          }
          &:before {
              top: 0;
              left: 0;
              width: 38px;
              height: 20px;
              border: 1px solid #2F3545;
              transition: all .3s ease;
          }
          &:after {
              width: 14px;
              height: 14px;
              background: #2F3545;
              top: 3px;
              left: 3px;
              transition: all .45s ease;
          }
          & + svg {
              display: none;
          }
      }
      &:checked {
          & + span {
              &:before {
                  background: #5628EE;
                  border-color: #5628EE;
              }
              &:after {
                  background: #fff;
                  transform: translate(18px, 0);
              }
          }
      }
  }
  &:hover {
      input {
          &:not(:checked) {
              & + span {
                  &:before {
                      border-color: #23C4F8;
                  }
              }
          }
      }
  }
}


`