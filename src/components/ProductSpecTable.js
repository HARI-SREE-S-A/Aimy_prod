import React from 'react';

export default function ProductSpecTable({ models }) {
  if (!models || models.length === 0) return null;

  // Extract all sections from the first model
  const firstModel = models[0];
  const sections = Object.keys(firstModel.specs);
  
  // Also collect root level properties that we want to show
  const commonFields = [
    { key: 'category', label: 'Category' },
    { key: 'modelCode', label: 'Model Code' },
    { key: 'shapes', label: 'Shapes' },
    { key: 'warranty', label: 'Warranty' },
    { key: 'wattage', label: 'Rated Wattage' },
    { key: 'mrp', label: 'MRP' }
  ].filter(field => models.some(m => m[field.key]));

  return (
    <div className="spec-table-container">
      <table className="spec-table">
        <thead>
          <tr>
            <th>Parameters</th>
            {models.map((model, idx) => (
              <th key={idx}>{model.modelCode || `Model ${idx + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Base Properties */}
          {commonFields.map(field => (
            <tr key={field.key}>
              <td>{field.label}</td>
              {models.map((model, idx) => (
                <td key={idx} dangerouslySetInnerHTML={{ __html: model[field.key] || 'N/A' }}></td>
              ))}
            </tr>
          ))}

          {/* Grouped Properties by Section */}
          {sections.map(section => {
            // Get all parameters for this section across all models
            const paramsSet = new Set();
            models.forEach(model => {
              if (model.specs[section]) {
                Object.keys(model.specs[section]).forEach(p => paramsSet.add(p));
              }
            });
            const params = Array.from(paramsSet);

            return (
              <React.Fragment key={section}>
                {/* Section Header Row */}
                <tr className="section-row">
                  <td colSpan={models.length + 1} dangerouslySetInnerHTML={{ __html: section }}></td>
                </tr>
                
                {/* Parameter Rows */}
                {params.map(param => (
                  <tr key={param}>
                    <td dangerouslySetInnerHTML={{ __html: param }}></td>
                    {models.map((model, idx) => {
                      const val = model.specs[section]?.[param] || 'N/A';
                      return <td key={idx} dangerouslySetInnerHTML={{ __html: val }}></td>;
                    })}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
