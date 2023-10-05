import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab } from "react-bootstrap";
import { ProductCard } from "./ProductCard";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import ProductForm from './ProductForm';
import { db } from "../firebaseConfig/firebase-config";
import Swal from 'sweetalert2';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const productsCollections = collection(db, "products");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cachedData, setCachedData] = useState([]);

  const createProduct = async (newProductData) => {
    try {
      const docRef = await addDoc(productsCollections, newProductData);

      setProducts((prevProducts) => [...prevProducts, { id: docRef.id, ...newProductData }]);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cachedData.length === 0) {
          const data = await getDocs(productsCollections);
          const productsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setCachedData(productsData);
          setOriginalProducts(productsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        return;
      }

      let sortedProducts = [...cachedData];

      if (sortOption === "default") {
        sortedProducts.sort((a, b) => {
          if (a.state === "Disponible" && b.state !== "Disponible") {
            return -1;
          } else if (a.state !== "Disponible" && b.state === "Disponible") {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sortOption === "alphabetical") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === "priceMenor") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "priceMayor") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProducts(sortedProducts);
      setIsLoading(false);
    };

    fetchData();
  }, [cachedData, productsCollections, sortOption]);

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  };

  const getUpdateProducts = async (id) => {
    Swal.fire({
      title: 'Confirmar Reserva',
      html: `
        <p>¿Está seguro de que desea reservar este producto?</p>
        <input type="text" id="username" class="swal2-input" placeholder="Ingrese un alias">
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const username = Swal.getPopup().querySelector('#username').value;
        if (!username) {
          Swal.showValidationMessage('Por favor, ingrese un alias o nombre');
        } else {
          // Actualiza el estado localmente
          const updatedProducts = originalProducts.map((product) => {
            if (product.id === id) {
              return { ...product, state: `Reservado por: ${username}` };
            }
            return product;
          });

          setOriginalProducts(updatedProducts);
          setProducts(updatedProducts);

          // Actualiza en la base de datos
          try {
            const productRef = doc(productsCollections, id);
            await updateDoc(productRef, { state: `Reservado por: ${username}` });
            Swal.fire('Reservado', `El producto ha sido reservado por ${username} con éxito`, 'success');
          } catch (error) {
            console.error('Error al actualizar en la base de datos:', error);
          }
        }
      },
    });
  };

  const handleShowFormClick = () => {
    Swal.fire({
      title: 'Ingrese la contraseña',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      preConfirm: async (password) => {
        const enteredPasswordBase64 = btoa(unescape(encodeURIComponent(password)));
        console.log(enteredPasswordBase64)
        if (enteredPasswordBase64 === 'U2FtdWVsMjAyMw==') {
          setShowForm(true);
        } else {
          Swal.showValidationMessage('Contraseña incorrecta');
        }
      }
    });
  };

  return (
    <section className="project" id="projects">
      <Container>
        {isLoading ? <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div> :
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h2 style={{ marginTop: '-60px' }}>Lista De Regalos</h2>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first" style={{ marginTop: '20px' }}>
                          {showForm ? (
                            <ProductForm onCreateProduct={createProduct} />
                          ) : (
                            <div>
                              <button onClick={handleShowFormClick} className="btn btn-sm-light">
                                Mostrar formulario
                              </button>
                            </div>
                          )}
                          <Container>
                            <div className="d-flex  justify-content-end mb-5">
                              <select className="form-select w-100 mt-3 w-auto" value={sortOption} onChange={handleSortChange}>
                                <option value="default">Ordenar por...</option>
                                <option value="alphabetical">A-Z</option>
                                <option value="priceMenor">Precio (Menor a Mayor)</option>
                                <option value="priceMayor">Precio (Mayor a Menor)</option>
                              </select>
                            </div>
                            <Row>
                              {
                                products.map((item) => {
                                  return (
                                    <ProductCard
                                      key={item.id}
                                      {...item}
                                      onReserve={() => getUpdateProducts(item.id)}
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
        }
      </Container >
    </section >
  )
}
