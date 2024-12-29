import { Props } from '../types/form';


const PlanDropdowns = ({ response, register, watch }: Props) => {
  const selectedPlan = watch('servicePlan');

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
    </>
  );
};

export default PlanDropdowns;