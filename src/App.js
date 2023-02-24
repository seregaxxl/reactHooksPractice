import {Component, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
// // class Slider extends Component {

// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             autoplay: false,
// //             slide: 0
// //         }
// //     }

// //     componentDidMount() {
// //         document.title = `Slide:${this.state.slide}`;
// //     }

// //     componentDidUpdate() {
// //         document.title = `Slide:${this.state.slide}`;
// //     }

// //     changeSlide = (i) => {
// //         this.setState(({slide}) => ({
// //             slide: slide + i
// //         }))
// //     }

// //     toggleAutoplay = () => {
// //         this.setState(({autoplay}) => ({
// //             autoplay: !autoplay
// //         }))
// //     }

// //     render() {
// //         return (
// //             <Container>
// //                 <div className="slider w-50 m-auto">
// //                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
// //                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
// //                     <div className="buttons mt-3">
// //                         <button 
// //                             className="btn btn-primary me-2"
// //                             onClick={() => this.changeSlide(-1)}>-1</button>
// //                         <button 
// //                             className="btn btn-primary me-2"
// //                             onClick={() => this.changeSlide(1)}>+1</button>
// //                         <button 
// //                             className="btn btn-primary me-2"
// //                             onClick={this.toggleAutoplay}>toggle autoplay</button>
// //                     </div>
// //                 </div>
// //             </Container>
// //         )
// //     }
// // }

// const calcValue = () => {
//     return Math.floor(Math.random() * (100) - 50)
// }

// function logging() {
//     console.log('log');
// }

// const Slider = (props) => {

//     const [slide, setSlide] = useState(0);
//     const [autoplay, setAutoplay] = useState(false);

//     useEffect(() => {
//         console.log('effect');
//         document.title = `Slide:${slide}`;
//         window.addEventListener('click', logging);

//         return () => {
//             window.removeEventListener('click', logging);
//         }
//     }, [slide]); 

//     function changeSlide(i) {
//         setSlide(slide => slide + i)
//     } 
//     function toggleAutoplay() {
//         setAutoplay(autoplay => !autoplay)
//     }

//     return (
//         <Container>
//             <div className="slider w-50 m-auto">
//                 <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                 <div className="text-center mt-5">Active slide {slide} <br/>
//                  {autoplay ? 'auto' : null}
//                  </div>
//                 <div className="buttons mt-3">
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => changeSlide(-1)}>-1</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={() => changeSlide(1)}>+1</button>
//                     <button 
//                         className="btn btn-primary me-2"
//                         onClick={toggleAutoplay}>toggle autoplay</button>
//                 </div>
//             </div>
//         </Container>
//     )
// }


// function App() {
// const [slider, setSlider] = useState(true);

//   return (
//         <>
//         <button onClick={() => {
//             setSlider(false)
//         }}>
//             Click
//         </button>
//         {slider ? <Slider/> : null}
//         </>
//   );
// }

// export default App;



const App = (props) => {

    // Используйте только стрелочную форму методов
    // Почему? Подробный ответ будет в следующем уроке
    const [er, setEr] = useState(10);
    const [currency, setCur] = useState('CAD');
    const [array, setArray] = useState([])
    let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    const getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };
    useEffect(() => {
        getResource(url).then(res => {
            setArray(res);
            console.log('penis')
        });

    }, []); 

    useEffect(() => {
        if (array.length > 0) {
            array.forEach(item => {
                if (item.cc === currency) {
                    setEr(item.rate)
                }
                })
        }
        document.title = `${currency} to UAH rate is ${er}`
    }, [array, currency, er]); 


    return (
        <div class="app">
            <div class="counter">{er}</div>
            <div class="controls">
            <button onClick={() => setCur('USD')}>USD</button>
            <button onClick={() => setCur('CAD')}>CAD</button>
            <button onClick={() => setCur('EUR')}>EUR</button>
            <button onClick={() => setCur('TRY')}>TRY</button>
            </div>
        </div>
      )
    }

    export default App;
  
//   ReactDOM.render(<App/>, document.getElementById('app'));
  
  // 1) Начальное значение счетчика должно передаваться через props
  // 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
  // 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
  // 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов
