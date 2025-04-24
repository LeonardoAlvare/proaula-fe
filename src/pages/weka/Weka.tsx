import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Weka() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    edad: 0,
    yearsExperience: 0,
    educationLevel: "",
    languages: "",
    workAvailability: "",
    category: "",
    developerLevel: "",
    paymentProposal: 0,
    estimatedTime: 0,
    categoryProyect: "",
  });

  const [predictionResult, setPredictionResult] = useState<{
    prediccion: string;
    probabilidades: Record<string, number>;
  } | null>(null);

  const educationLevelOptions = [
    { label: "Bachiller", value: 0 },
    { label: "Semi-técnico", value: 1 },
    { label: "Tecnólogo", value: 2 },
    { label: "Profesional", value: 3 },
  ];

  const languagesOptions = [
    { label: "Español", value: 1 },
    { label: "Inglés", value: 2 },
    { label: "Español e Inglés", value: 3 },
  ];

  const workAvailabilityOptions = [
    { label: "Tiempo Completo", value: 0 },
    { label: "Medio Tiempo", value: 1 },
  ];

  const categoryOptions = [
    { label: "Web", value: "0" },
    { label: "Mobile", value: "1" },
    { label: "Backend", value: "2" },
    { label: "Fullstack", value: "3" },
  ];

  const experienceOptions = [
    { label: "Junior", value: 0 },
    { label: "Semi-Senior", value: 1 },
    { label: "Senior", value: 2 },
  ];

  const handleDropdownChange = (name: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);

    // Validación de campos numéricos >= 0
    if (
      formData.edad < 0 ||
      formData.yearsExperience < 0 ||
      formData.paymentProposal < 0 ||
      formData.estimatedTime < 0
    ) {
      alert("Los valores numéricos no pueden ser menores a 0.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/prediccion/realizar-prediccion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error en la predicción");

      const data = await response.json();
      console.log("Respuesta:", data);
      setPredictionResult(data);
    } catch (error) {
      console.error("Error al hacer la predicción:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="col-span-2">
        <Button
          icon="pi pi-arrow-left"
          className="mb-4"
          label="Volver"
          text
          onClick={() => navigate("/landing")}
        />
      </div>

      <h1 className="text-center font-bold mb-4">
        ¿Tu perfil de freelance sera aceptado a un proyecto?
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Nombre */}
        <FloatLabel>
          <InputText
            id="name"
            name="name"
            onChange={(e) => handleDropdownChange("nombre", e.target.value)}
            className="w-full"
          />
          <label htmlFor="name">Nombre</label>
        </FloatLabel>

        {/* Edad */}
        <FloatLabel>
          <InputNumber
            id="edad"
            value={formData.edad}
            onValueChange={(e) => handleDropdownChange("edad", e.value ?? 0)}
            className="w-full"
            min={0}
          />
          <label htmlFor="edad">Edad</label>
        </FloatLabel>

        {/* Años de experiencia */}
        <FloatLabel>
          <InputNumber
            id="yearsExperience"
            value={formData.yearsExperience}
            onValueChange={(e) =>
              handleDropdownChange("yearsExperience", e.value ?? 0)
            }
            className="w-full"
            min={0}
          />
          <label htmlFor="yearsExperience">Años de experiencia</label>
        </FloatLabel>

        {/* Nivel educativo */}
        <FloatLabel>
          <Dropdown
            inputId="educationLevel"
            value={formData.educationLevel}
            options={educationLevelOptions}
            onChange={(e) => handleDropdownChange("educationLevel", e.value)}
            className="w-full"
          />
          <label htmlFor="educationLevel">Nivel educativo</label>
        </FloatLabel>

        {/* Idiomas */}
        <FloatLabel>
          <Dropdown
            inputId="languages"
            value={formData.languages}
            options={languagesOptions}
            onChange={(e) => handleDropdownChange("languages", e.value)}
            className="w-full"
          />
          <label htmlFor="languages">Idiomas</label>
        </FloatLabel>

        {/* Disponibilidad */}
        <FloatLabel>
          <Dropdown
            inputId="workAvailability"
            value={formData.workAvailability}
            options={workAvailabilityOptions}
            onChange={(e) => handleDropdownChange("workAvailability", e.value)}
            className="w-full"
          />
          <label htmlFor="workAvailability">Disponibilidad</label>
        </FloatLabel>

        {/* Categoría */}
        <FloatLabel>
          <Dropdown
            inputId="category"
            value={formData.category}
            options={categoryOptions}
            onChange={(e) => handleDropdownChange("category", e.value)}
            className="w-full"
          />
          <label htmlFor="category">Categoría</label>
        </FloatLabel>

        {/* Nivel del desarrollador */}
        <FloatLabel>
          <Dropdown
            inputId="developerLevel"
            value={formData.developerLevel}
            options={experienceOptions}
            onChange={(e) => handleDropdownChange("developerLevel", e.value)}
            className="w-full"
          />
          <label htmlFor="developerLevel">Nivel del Desarrollador</label>
        </FloatLabel>

        {/* Propuesta de pago */}
        <FloatLabel>
          <InputNumber
            id="paymentProposal"
            value={formData.paymentProposal}
            onValueChange={(e) =>
              handleDropdownChange("paymentProposal", e.value ?? 0)
            }
            className="w-full"
            min={0}
          />
          <label htmlFor="paymentProposal">Propuesta de pago</label>
        </FloatLabel>

        {/* Tiempo estimado */}
        <FloatLabel>
          <InputNumber
            id="estimatedTime"
            value={formData.estimatedTime}
            onValueChange={(e) =>
              handleDropdownChange("estimatedTime", e.value ?? 0)
            }
            className="w-full"
            min={0}
          />
          <label htmlFor="estimatedTime">Tiempo estimado (días)</label>
        </FloatLabel>

        {/* Categoría del proyecto */}
        <FloatLabel>
          <Dropdown
            inputId="categoryProyect"
            value={formData.categoryProyect}
            options={categoryOptions}
            onChange={(e) => handleDropdownChange("categoryProyect", e.value)}
            className="w-full"
          />
          <label htmlFor="categoryProyect">Categoría del proyecto</label>
        </FloatLabel>

        <Button type="submit" label="Realizar predicción" icon="pi pi-send" />
      </form>

      {predictionResult && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            Resultado de la predicción:
          </h3>
          <p>
            <strong>Predicción:</strong> {predictionResult.prediccion}
          </p>
          <ul>
            {Object.entries(predictionResult.probabilidades).map(
              ([label, prob]) => (
                <li key={label}>
                  <strong>{label}:</strong> {prob}%
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
