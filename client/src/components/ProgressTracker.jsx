import React from "react";

const ProgressTracker = ({ selectedApplication }) => {
  const Tooltip = ({ text }) => (
    <span className="ml-2 text-sm text-gray-400 cursor-pointer" title={text}>
      ⓘ
    </span>
  );

  const steps = [
    {
      label: "Prijava na praksu",
      done: true,
    },
    {
      label: "Odabrana praksa",
      done: selectedApplication?.selected || false,
    },
    {
      label: "Predan Sporazum o stručnoj praksi",
      done: selectedApplication?.sporazumPredan || false,
      tooltip: "Prije početka obavljanja prakse dostaviti potpisan i pečatiran Sporazum o stručnoj praksi za aktualnu akademsku godinu."
    },
    {
      label: "Dokumentacija odobrena",
      done: selectedApplication?.dokumentacijaKompletna || false,
    },
    {
      label: "Završena praksa",
      done: selectedApplication?.praksaUspjesnoObavljena || false,
    },
  ];

  const completedCount = steps.filter((step) => step.done).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Status prakse</h2>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={step.done}
              readOnly
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span
              className={`ml-3 text-gray-800 ${step.done ? "font-semibold" : ""}`}
            >
              {step.label}
            </span>
            {step.tooltip && <Tooltip text={step.tooltip} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker;