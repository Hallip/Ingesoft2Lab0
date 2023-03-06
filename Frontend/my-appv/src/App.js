import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import { Container, Row, Col } from 'react-bootstrap';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './App.css';

function App() {
  const [personas, setPersonas] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    fetch('/municipios')
      .then(response => response.json())
      .then(data => setMunicipios(data))
      .catch(error => console.error(error));
    fetch('/viviendas')
      .then(response => response.json())
      .then(data => setViviendas(data))
      .catch(error => console.error(error));
    fetch('/personas')
      .then(response => response.json())
      .then(data => setPersonas(data))
      .catch(error => console.error(error));
    fetch('/gobernantes')
      .then(response => response.json())
      .then(data => setPersonas(data))
      .catch(error => console.error(error));
      
  }, []);


  return (
    <div className="App">
      <div className="Pantalla">
      <Container>
        <Row>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {viviendas.map(vivienda => (
              <SwiperSlide>
                <div className="card">
                  <div className="card__image">
                    <img src="./Utils/casa.jpg" alt="card image"></img>
                  </div>

                  <div className="card__content">
                    <span className="card__title">{vivienda.direccion}</span>
                    <span className="card__name">{vivienda.capacidad}</span>
                    <p className="card__text">{vivienda.niveles}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Row>
        <hr style={{ borderTop: '2px solid black' }} />
        <Row>
          <Col className="border-right">
            {personas.length ?
              <><span className="sectionTitle">Propietario:</span><div className="card__content">
                <div className="card__image">
                  <img src="./Utils/casa.jpg" alt="card image"></img>
                </div>
                <span className="card__title">{personas[0].nombre}</span>
                <span className="card__name">{personas[0].telefono}</span>
                <p className="card__text">{personas[0].edad}</p>
                <button className="card__btn">{personas[0].sexo}</button>
              </div></>
              : <span className="sectionTitle"> Loading..</span>}
          </Col>
          <Col>
            {municipios.length ?
              <><span className="sectionTitle">Localizacion:</span><div className="card__content">
                <div className="card__image">
                  <img src="./Utils/local.png" alt="card image"></img>
                </div>
                <span className="card__title">{municipios[0].nombre}</span>
                <span className="card__name">{municipios[0].area}</span>
                <p className="card__text">{municipios[0].presupuesto}</p>
              </div></>
              : <span className="sectionTitle"> Loading..</span>}
          </Col>
        </Row>
        <Row>
        <span className="sectionTitle">Habitantes:</span>
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {personas.map(persona => (
              <SwiperSlide>
                <div className="card">
                  <div className="card__image">
                    <img src="./Utils/casa.jpg" alt="card image"></img>
                  </div>

                  <div className="card__content">
                    <span className="card__title">{persona.nombre}</span>
                    <span className="card__name">{persona.telefono}</span>
                    <p className="card__text">{persona.edad}</p>
                    <button className="card__btn">{persona.sexo}</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Row>
      </Container>
      </div>
      


    </div>
  );
}

export default App;
