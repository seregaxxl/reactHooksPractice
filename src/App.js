// import {Component, useState, useEffect, useCallback, useMemo} from 'react';
// import {Container} from 'react-bootstrap';
// import './App.css';

// function logging() {
//     console.log('log');
// }

// const countTotal = (num) => {
//     console.log('counting');
//     return num + 10;
// }

// const Slider = (props) => {

//     const [slide, setSlide] = useState(0);
//     const [autoplay, setAutoplay] = useState(false);

//     const getSomeImages = useCallback(() => {
//         console.log('fetching');
//         return [
//             "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
//             "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
//         ]
//     },[])

//     useEffect(() => {
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
//     const total = useCallback(() => {
//         return countTotal(slide)
//     },[slide])

//     const style = useMemo(() => 
//         ({color: slide > 4 ? 'red' : 'black'})
//     ,[slide])

//     useEffect(()=>{
//         console.log('style')
//     },[style])

//     return (
//         <Container>
//             <div className="slider w-50 m-auto">
//                 {
//                     // getSomeImages().map((url,i)=>{
//                     //     return <img key={i} className="d-block w-100" src={url} alt="slide" />
 
//                     // })
//                 }
//                 <Slide getSomeImages={getSomeImages}/>
                
//                 <div className="text-center mt-5">Active slide {slide} <br/>
//                  {autoplay ? 'auto' : null}
//                  </div>
//                  <div style={style} className="text-center mt-5">Total slides {total}
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

// const Slide = ({getSomeImages}) => {
//     const [images, setImages] = useState([])
//     useEffect(()=>{
//         setImages(getSomeImages())
//     },[getSomeImages])

//     return (
//         <>
//         {images.map((url,i) => {
//             return <img key={i} className="d-block w-100" src={url} alt="slide" />
//         })}
//         </>
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



// const App = (props) => {

//     // Используйте только стрелочную форму методов
//     // Почему? Подробный ответ будет в следующем уроке
//     const [er, setEr] = useState(10);
//     const [currency, setCur] = useState('CAD');
//     const [array, setArray] = useState([])
//     let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
//     const getResource = async (url) => {
//         let res = await fetch(url);
//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status ${res.status}`);
//         }
//         return await res.json();
//     };
//     useEffect(() => {
//         getResource(url).then(res => {
//             setArray(res);
//             console.log('penis')
//         });

//     }, []); 

//     useEffect(() => {
//         if (array.length > 0) {
//             array.forEach(item => {
//                 if (item.cc === currency) {
//                     setEr(item.rate)
//                 }
//                 })
//         }
//         document.title = `${currency} to UAH rate is ${er}`
//     }, [array, currency, er]); 


//     return (
//         <div class="app">
//             <div class="counter">{er}</div>
//             <div class="controls">
//             <button onClick={() => setCur('USD')}>USD</button>
//             <button onClick={() => setCur('CAD')}>CAD</button>
//             <button onClick={() => setCur('EUR')}>EUR</button>
//             <button onClick={() => setCur('TRY')}>TRY</button>
//             </div>
//         </div>
//       )
//     }

//     export default App;
  
//   ReactDOM.render(<App/>, document.getElementById('app'));
  
  // 1) Начальное значение счетчика должно передаваться через props
  // 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
  // 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
  // 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов

import { useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

function useInputsWithValidate(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const validateInput = () => {
        return value.search(/\d/) >= 0
    }

    return {value, onChange, validateInput}
}

const Form = () => {

    const text = useInputsWithValidate('');
    const textArea = useInputsWithValidate('');


    const color = text.validateInput(text) ? 'text-danger' : null

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <input value={`${text.value} / ${textArea.value}`} type="text" className="form-control" readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input 
                    onChange={text.onChange} 
                    type="email" 
                    value={text.value}
                    className={`form-control ${color}`} 
                    id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea
                    onChange={textArea.onChange}
                    value={textArea.value}
                    className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;
