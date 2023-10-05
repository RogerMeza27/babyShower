import { Container, Row, Col, Tab } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Teteros",
      description: "Set Teteros Combo Biberones Inicio Recién Nacidos Natural Avent Azul",
      imgUrl: 'https://i.linio.com/p/cb074b358c6e992737834d7ed4d93d16-product.webp',
      url: 'https://www.linio.com.co/p/set-teteros-combo-biberones-inicio-recie-n-nacidos-natural-avent-azul-ykp29v?adjust_t=1zira0_f1h7ws&adjust_google_network=x&adjust_google_placement=&adjust_campaign=LICO-LAB-AO-INSTI-INS00019-KidsBabies-Jun22-GG-Performance_Max-Conversion-Mix&adjust_adgroup=&utm_term=&gclid=CjwKCAjw9-6oBhBaEiwAHv1QvI04AuiK9kcP75hCYCqM9Fd--rs8V4nqobPAuLL78tYDRFfTtdKMJBoCmBQQAvD_BwE'
    },
    {
      title: "Silla Vibradora",
      description: "Silla Vibradora Mecedora Para Bebes Baby Rocker RANA",
      imgUrl: 'https://i.linio.com/p/4ab187bcc3740cf47f8528b8bea6e40a-product.webp',
      url: 'https://www.linio.com.co/p/silla-vibradora-mecedora-para-bebes-baby-rocker-rana-jsaoie'
    },
    {
      title: "Gimnasio Bebe",
      description: "Gimnasio Bebe Musical Tapete Piano 0639",
      imgUrl: 'https://i.linio.com/p/a563849e4f13240fdfb986596fabf74e-product.webp',
      url: 'https://www.linio.com.co/p/gimnasio-bebe-musical-tapete-piano-0639-jos79s'
    },
    {
      title: "Extractor De Leche",
      description: "Extractor De Leche Materna Eléctrico Breast Pump-Blanco",
      imgUrl: 'https://i.linio.com/p/9fe92cddada6f99eca87cb3cc856bfb0-product.webp',
      url: 'https://www.linio.com.co/p/extractor-de-leche-materna-ele-ctrico-breast-pump-blanco-n2qdk5'
    },
    {
      title: "Silla para carro",
      description: "Silla para carro bebé FOCUS Priori Cinturón de seguridad del vehículo",
      imgUrl: 'https://i.linio.com/p/5bbe804726e66fc0ea8ac5be1246e43f-product.webp',
      url: 'https://www.linio.com.co/p/silla-para-carro-bebe-focus-priori-cinturo-n-de-seguridad-del-vehi-culo-ossdqo?adjust_t=1zira0_f1h7ws&adjust_google_network=x&adjust_google_placement=&adjust_campaign=LICO-LAB-AO-INSTI-INS00019-KidsBabies-Jun22-GG-Performance_Max-Conversion-Mix&adjust_adgroup=&utm_term=&gclid=CjwKCAjw9-6oBhBaEiwAHv1QvPia19hyB646qFufteaK1YWC-h-a-cIiPNzFFFE7MJ5Vw5o_fBKL6xoCuyMQAvD_BwE'
    },
    {
      title: "Corral Cuna Colecho",
      description: "Corral Cuna Colecho Bebé Happy Baby Silver Gris",
      imgUrl: 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_120399300_2595198_1?wid=800&hei=800&qlt=70',
      url: 'https://www.falabella.com.co/falabella-co/product/120399300/Corral-Cuna-Colecho-Bebe-Happy-Baby-Silver-Gris/120399301?kid=shopp0000030fc&pid=Google_w2a&gclid=CjwKCAjw9-6oBhBaEiwAHv1QvHFYPEBT_g68jz_7ayOb0dV_xr9SscNrJZ60m1U4CIE5Wtxn_kvaVBoCx68QAvD_BwE'
    },
    {
      title: "Pañalera Tipo Cuna",
      description: "Pañalera Tipo Cuna Con Cambiador 3 En 1 Usb",
      imgUrl: 'https://i.linio.com/p/d3da6dceb6742626f28787953b983acf-product.webp',
      url: 'https://www.linio.com.co/p/pan-alera-tipo-cuna-con-cambiador-3-en-1-usb-qdxrbw?adjust_t=1zira0_f1h7ws&adjust_google_network=x&adjust_google_placement=&adjust_campaign=LICO-LAB-AO-INSTI-INS00019-KidsBabies-Jun22-GG-Performance_Max-Conversion-Mix&adjust_adgroup=&utm_term=&gclid=CjwKCAjw9-6oBhBaEiwAHv1QvNhT7juY5FLDVDaLAOYDsvjSroigz07p5-ekoG5ItBXMcO81mRvOyhoCHTYQAvD_BwE'
    },
    {
      title: "Colchoneta Corral Cuna",
      description: "Colchoneta Corral Cuna Aloha Baby - 100 X 70 x 5 cm",
      imgUrl: 'https://pepeganga.vtexassets.com/arquivos/ids/619469/778833-1.png?v=637648322087300000',
      url: 'https://www.pepeganga.com/colchoneta-corral-cuna-aloha-baby-100-70-5-cm-colchcorr100/p'
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 style={{ marginTop: '-60px' }}>Lista De Regalos</h2>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first" style={{ marginTop: '50px' }}>
                        <Container>
                          <Row>
                            {
                              projects.map((project, index) => {
                                return (
                                  <ProjectCard
                                    key={index}
                                    {...project}
                                  />
                                )
                              })
                            }
                          </Row>
                        </Container>
                      </Tab.Pane>
                      <Tab.Pane eventKey="section">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
