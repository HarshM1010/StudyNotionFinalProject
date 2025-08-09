import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const StepIndicator = (props) => {
  const currentStep = props.currentStep;
  const setCurrentStep = props.setCurrentStep;
  const steps = [
      {
        number: 1,
        title: "Course Information",
        description: "Basic details about your course"
      },
      {
        number: 2,
        title: "Course Builder",
        description: "Create lessons and sections"
      },
      {
        number: 3,
        title: "Publish",
        description: "Review and make it live"
      }
    ];
  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep) {
        setCurrentStep(stepNumber);
      }
  };

  return (
     <div className="w-[90%] max-w-4xl mx-auto px-3 py-5 rounded-2xl">
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 transform -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transform -translate-y-1/2 z-10 transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / 2) * 100}%`}}>
        </div>
        <div className="relative flex justify-between items-center z-20">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center group ">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer
                  transition-all duration-500 ease-out transform hover:scale-110
                  ${step.number < currentStep 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                    : step.number === currentStep 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-400/30' 
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }
                `}
                onClick={() => handleStepClick(step.number)}
              >
                {step.number < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-bold">{step.number}</span>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className={`
                  font-semibold text-sm transition-colors duration-300
                  ${step.number <= currentStep ? 'text-white' : 'text-slate-400'}
                `}>
                  {step.title}
                </h3>
                <p className={`
                  text-xs mt-1 transition-colors duration-300
                  ${step.number <= currentStep ? 'text-slate-300' : 'text-slate-500'}
                `}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
