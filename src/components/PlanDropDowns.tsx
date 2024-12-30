import { Props } from '../types/form';


const PlanDropdowns = ({ response, register, watch }: Props) => {
  const selectedPlan = watch('servicePlan');
  const selectedComponents = watch('components') || [];


  const servicePlans = response.map(plan => {
    const basePricing = plan.pricingDetails.find(detail => detail.serviceComponent);
    return {
      name: plan.servicePlanName,
      price: basePricing?.planPrice || 0
    };
  });

  const components = selectedPlan 
    ? response
        .find(p => p.servicePlanName === selectedPlan)
        ?.pricingDetails.filter(detail => !detail.serviceComponent) || []
    : [];
  
  const calculateTotalPrice = () => {
    const basePlan = servicePlans.find(plan => plan.name === selectedPlan);
    const basePrice = basePlan?.price || 0;
    
    const addOnsPrice = components
      .filter(comp => selectedComponents.includes(String(comp.pricingEntryId)))
      .reduce((sum, comp) => sum + (comp.componentPrice || 0), 0);
    
    return (basePrice + addOnsPrice) || 0;
  };

  return (
    <>
      <div className="form-control">
        <label htmlFor="servicePlan">Select Membership Plan</label>
        <select {...register('servicePlan')}>
          <option value="">Select Membership Plan</option>
          {servicePlans.map(plan => (
            <option key={plan.name} value={plan.name}>
              {`${plan.name} - $${plan.price}`}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label>Choose Add-Ons or Upgrades</label>
        <div className="checkbox-group">
          {components.map(component => (
            <div key={component.pricingEntryId} className="checkbox-item">
              <input
                type="checkbox"
                value={component.pricingEntryId}
                id={`component-${component.pricingEntryId}`}
                {...register('components')}
              />
              <label htmlFor={`component-${component.pricingEntryId}`}>
                {`${component.componentName} - $${component.componentPrice}`}
              </label>
            </div>
          ))}
        </div>
      </div>

   
        <div className="form-control">
          <label>Total Price</label>
          <div className="price-display">
            ${calculateTotalPrice().toFixed(2)}
          </div>
        </div>
   
    </>
  );
};

export default PlanDropdowns;