import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import { Container, Row, Col } from 'react-bootstrap';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './App.css';
import './Utils/casa.jpg';


function ChangeGuberment(index, gobernantes, viviendas, personas) {
  let personGobernante = null;
  gobernantes.forEach(gobernante => {
    if (gobernante.id_mun == viviendas[index].municipioid) {
      personas.forEach(persona => {
        console.log("persona:", persona)
        if (gobernante.id_persona == persona.id_persona) {
          personGobernante = persona;
        }
      }
      )
    }
  })
  return personGobernante; 
}

function changeHabitantes(index, viviendas, personas, per_viv) {
  let habitantesByVivienda = [];
  per_viv.forEach(perviv =>{
    if(perviv.viviendaid_viv == viviendas[index].id_viv){
      personas.forEach(persona => {
        if (persona.id_persona == perviv.personaid_persona) {
          habitantesByVivienda.push(persona)
        }
      })
    }
  })
  return habitantesByVivienda; 
}

function ChangeMunicipio(index, viviendas, municipios) {
  let municipioByVivienda = null;
  municipios.forEach(municipio => {
    if (municipio.id_mun == viviendas[index].municipioid) {
      municipioByVivienda = municipio;
    }
  })
  return municipioByVivienda; 
}

function App() {
  const [personas, setPersonas] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [gobernantes, setGobernantes] = useState([]);
  const [per_viv, setPer_viv] = useState([]);
  const [personGobernante, setPersonGobernante] = useState(null);
  const [municipioByVivienda, setmunicipioByVivienda] = useState(null);
  const [habitantesByVivienda, setHabitantesByVivienda] = useState(null);

  
  useEffect(() => {              
    Promise.all([
      fetch('/municipios'),
      fetch('/viviendas'),
      fetch('/personas'),
      fetch('/gobernantes'),
      fetch('/personas_con_vivienda')
    ])
      .then(([municipiosResponse, viviendasResponse, personasResponse, gobernantesResponse, per_vivResponse]) => Promise.all([
        municipiosResponse.json(),
        viviendasResponse.json(),
        personasResponse.json(),
        gobernantesResponse.json(),
        per_vivResponse.json()
      ]))
      .then(([municipiosData, viviendasData, personasData, gobernantesData, per_vivData]) => {
        setMunicipios(municipiosData);
        setViviendas(viviendasData);
        setPersonas(personasData);
        setGobernantes(gobernantesData);
        setPer_viv(per_vivData);
        setPersonGobernante(ChangeGuberment(0, gobernantesData, viviendasData, personasData));
        setmunicipioByVivienda(ChangeMunicipio(0, viviendasData, municipiosData));
        setHabitantesByVivienda(changeHabitantes(0, viviendasData, personasData, per_vivData))
      })
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
                rotate: 25,
                stretch: -50,
                depth: 300,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              onSlideChange={(swiper) => {
                setPersonGobernante(ChangeGuberment(swiper.activeIndex ? swiper.activeIndex : 0, gobernantes, viviendas, personas));
                setmunicipioByVivienda(ChangeMunicipio(swiper.activeIndex ? swiper.activeIndex : 0, viviendas, municipios));
                setHabitantesByVivienda(changeHabitantes(swiper.activeIndex ? swiper.activeIndex : 0, viviendas, personas, per_viv))
              }}
            >
              {viviendas.map(vivienda => (
                <SwiperSlide>
                  <div className="card">
                    <div className="card__image">
                      <img src="https://www.pngitem.com/pimgs/m/402-4028746_icono-de-vivienda-png-transparent-png.png" alt="card image"></img>
                    </div>
                    <div className="card__content">
                      <span className="card__title">Direccion: {vivienda.direccion}</span>
                      <span className="card__name">Capacidad vivienda: {vivienda.capacidad}</span>
                      <span className="card__name">Niveles Vivienda: {vivienda.niveles}</span>
                    </div>
                  </div>

                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
          <hr style={{ borderTop: '2px solid black' }} />
          <Row>
            <Col className="border-right">
              {personGobernante ?
                <><span className="sectionTitle">Gobernante:</span><div className="card__content">
                  <div className="card__image">
                    <img src="https://cdn-icons-png.flaticon.com/512/16/16363.png" alt="card image"></img>
                  </div>
                  <span className="card__title">Nombre: {personGobernante.nombre}</span>
                  <span className="card__name">Telefono: {personGobernante.telefono}</span>
                  <span className="card__text">Edad: {personGobernante.edad}</span>
                  <span className="card__text">Sexo: {personGobernante.sexo}</span>
                </div></>
                : <span className="sectionTitle"> Loading..</span>}
            </Col>
            <Col>
              {municipioByVivienda?
                <><span className="sectionTitle">Localizacion:</span><div className="card__content">
                  <div className="card__image">
                    <img src="https://www.freeiconspng.com/thumbs/localization-icon/map-localization-icon-14.png" alt="card image"></img>
                  </div>
                  <span className="card__title">Nombre municipio: {municipioByVivienda.nombre}</span>
                  <span className="card__name">Area: {municipioByVivienda.area}</span>
                  <p className="card__text">Presupuesto: {municipioByVivienda.presupuesto}</p>
                </div></>
                : <span className="sectionTitle"> Loading..</span>}
            </Col>
          </Row>
          <hr style={{ borderTop: '2px solid black' }} />
          <Row>
            <span className="sectionTitle">Habitantes:</span>
            {habitantesByVivienda ? <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 25,
                stretch: -50,
                depth: 300,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {habitantesByVivienda.map(persona => (
                <SwiperSlide>
                  <div className="card">
                    <div className="card__image">
                      <img src="https://cdn-icons-png.flaticon.com/512/16/16363.png" alt="card image"></img>
                    </div>

                    <div className="card__content">
                      <span className="card__title">Nombre: {persona.nombre}</span>
                      <span className="card__name">Telefono: {persona.telefono}</span>
                      <span className="card__text">Edad: {persona.edad}</span>
                      <span className="card__text">Sexo: {persona.sexo}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            : <span className="sectionTitle"> Loading..</span>}
          </Row>
        </Container>
      </div>



    </div>
  );
}

export default App;
