/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import logo from "./assets/logo.png";
import confetti from "canvas-confetti";
import { useRef } from "react";
import html2pdf from "html2pdf.js"; // Importamos html2pdf.js
//import { useNavigate } from "react-router-dom";
import "./styles/ticketForm.css";

function TicketForm() {
  //const navigate = useNavigate(); // Crear el hook de navegación
  // Estado para almacenar múltiples imágenes
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    costo: "",
    description: "",
    images: [],
    signature: null,
  });

  const signatureRef = React.useRef();
  const formRef = useRef();
  const [loading, setLoading] = useState(false); // Estado para mostrar el loader

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "costo" ? (value === "" ? "" : parseFloat(value)) : value,
    });
  };

  // Función para manejar la carga de imágenes
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convertimos los archivos seleccionados en un arreglo
    const newImages = files.map((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]); // Agregamos la imagen cargada al estado
      };
      reader.readAsDataURL(file); // Leemos cada archivo como URL base64
    });
  };

  // Manejo de firma
  const handleClearSignature = () => signatureRef.current.clear();

  const handleSaveSignature = () => {
    setFormData({
      ...formData,
      signature: signatureRef.current.getTrimmedCanvas().toDataURL("image/png"),
    });
  };

  // Función para generar el PDF usando html2pdf.js
  const generatePDF = () => {
    // Ocultar los botones antes de generar el PDF
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("hide-buttons"));
    // Capturar el contenido del formulario
    const element = formRef.current;

    // Configuración de html2pdf.js
    const opt = {
      margin: 0,
      filename: "ticket-servicio.pdf",
      image: { type: "jpeg", quality: 0.99 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generar el PDF
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        // Restaurar los botones después de generar el PDF
        buttons.forEach((button) => button.classList.remove("hide-buttons"));
      });
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Data:", formData);
    // Aquí puedes enviar los datos al backend o almacenarlos en el contexto global
    // Aquí se lanza el confeti
    confetti({
      particleCount: 100, // Número de partículas de confeti
      spread: 70, // Ángulo de dispersión
      origin: { x: 0.5, y: 0.5 }, // Centro de la pantalla
    });

    // Aquí podrías agregar el resto de la lógica de tu botón
    console.log("Ticket Generado");

    //generador pdf
    generatePDF();
  };

  // Función para borrar todo el contenido del formulario
  const handleClearForm = () => {
    setLoading(true); // Mostrar el loader

    // Simula un proceso de eliminación (puedes reemplazarlo con un proceso real)
    setTimeout(() => {
      setFormData({
        name: "",
        especie: "",
        raza: "",
        color: "",
        sexo: "",
        edad: "",
        peso: "",
        tutor: "",
        medico: "",
        cedula:"",
        costo: "",
        description: "",
        signature: null,
      });
      setImages([]); // Limpiar las imágenes
      setLoading(false); // Ocultar el loader después del proceso
    }, 3000); // Simular 2 segundos de carga
  };

  // Función para regresar a /dashboard
  const handleGoBack = () => {
    //  navigate("/dashboard"); // Redirige específicamente a /dashboard
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md bg-gradient-to-br from-gray-100 bg-cyan-00"
      ref={formRef}
    >
      <header className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 md:w-20 md:h-20 rounded-full shadow-lg shadow-gray-500/50 mb-4 md:mb-3"
        />

        {/* Información de contacto */}
        <div className="text-sm text-black-600 text-justify mb-4 md:mb-0 md:ml-4">
          <p className="text-lg md:text-xl mb-1">📞 (938) 118 02 89</p>
          <p className="text-lg md:text-xl mb-1">📞 (938) 125 56 28</p>
          <p className="text-lg md:text-xl mb-1">
            📧 animalhome_servet@hotmail.com
          </p>
        </div>

        {/* Dirección */}
        <div className="text-sm text-black-600 text-justify mb-4 md:mb-0 md:ml-4">
          <p className="text-lg md:text-xl mb-1">
            🏠 Av. Puerto de Campeche No. 123
          </p>
          <p className="text-lg md:text-xl mb-1">Col. Volcanes, C.P 24155</p>
          <p className="text-lg md:text-xl mb-1">
            Ciudad del Carmen, Campeche.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
      
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
              placeholder="Nombre de la mascota"
              required
            />
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Especie:
            </label>
            <input
              type="text"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
              placeholder="Especie"
              required
            />
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Raza
            </label>
            <input
              type="text"
              name="Raza"
              value={formData.raza}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
              placeholder="Raza"
              required
            />
          </div>

          {/*/////////////////////////////////////////////////////////////// */}

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
              placeholder="Color"
              required
            />
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Sexo
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
              required
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
          </div>



          
          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="texto margen w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
              placeholder="Edad"
              required
            />
          </div>




          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Peso:
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg">
              {/* Símbolo $ */}
              <span className="px-4 py-2 text-gray-500">KG</span>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                className="texto w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
                placeholder="Ingrese el peso"
                required
              />
            </div>
          </div>

          <div>
            <label className="margen block text-sm font-medium text-gray-900">
              Tutor:
            </label>
              <input
                type="name"
                name="tutor"
                value={formData.tutor}
                onChange={handleChange}
                className="texto w-60 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
                placeholder="Nombre del tutor"
                required
              />
          </div>

          <div className="col-span-2">
    <label className="margen block text-sm font-medium text-gray-900">
      MVZ:
    </label>
    <input
      type="name"
      name="medico"
      value={formData.medico}
      onChange={handleChange}
      className="texto w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
      placeholder="MVZ"
      required
    />
  </div>

  <div>
    <label className="margen block text-sm font-medium text-gray-900">
      Cédula:
    </label>
    <select
      name="cedula"
      value={formData.cedula}
      onChange={handleChange}
      className="texto margen w-full px-1 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
      required
    >
      <option value="" disabled>
        Selecciona una opción
      </option>
      <option value="8509642">8509642</option>
      <option value="8140814">8140814</option>
      <option value="13976760">13976760</option>
      <option value="13308906">13308906</option>
      <option value="13333238">13333238</option>
    </select>
  </div>

  <div className="col-span-3">
    <label className="margen block text-sm font-medium text-gray-900">
      Indicaciones:
    </label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-700"
      placeholder="Recomendaciones"
      rows="5"
      required
    />
  </div>

  <div className="col-span-3">
    <label className="margen block text-sm font-medium text-gray-900">
      Firma del MVZ:
    </label>
    <div className="border border-gray-300 rounded-lg p-4">
      <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{
          className: "w-full h-40",
        }}
      />
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={handleClearSignature}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          Limpiar
        </button>

        <button
          type="button"
          onClick={handleSaveSignature}
          className="ml-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</div>

        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white  generar focus:ring rounded-lg focus:ring-blue-300"
          >
            Generar Receta
          </button>
        </div>

        {/* Botón para regresar 
         <div className="mt-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full px-4 py-2 text-white bg-blumecolor3 rounded-lg hover:bg-blumecolor focus:ring focus:ring-blue-300"
          >
            Regresar
          </button>
        </div>*/}
        {/* Botón para borrar todo el contenido */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleClearForm} // Llamar a la función de limpiar
            className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Borrar Todo
          </button>
        </div>
      </form>
      {/* Pantalla de carga (loader) */}
      {loading && (
        <div className="loader-container fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50  bg-stone-800/10 backdrop-blur-sm">
          <span className="loader">Deleting</span>
        </div>
      )}
    </div>
  );
}

export default TicketForm;
