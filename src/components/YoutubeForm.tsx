import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import PlanDropdowns from './PlanDropDowns';
import { response } from "../data/response";
import { FormValues } from '../types/form';


const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, watch, reset} = form;
  const { errors } = formState;
  const socialOptions = [
    "Twitter",
    "Facebook",
    "Instagram",
    "YouTube",
    "LinkedIn"
  ];
  // const { name, ref, onChange, onBlur} = register('username')
   
 const {fields} = useFieldArray( {
  name: 'phNumbers',
  control
 }
  )

  const onSubmit = (data: FormValues) => {
    //handleSubmit destructure from form
    //pass it to onSubmit
    // onSubmit should have type defined
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        {/* <input type='email' id='email' name={name} ref={ref} onChange={onChange} onBlur={onBlur}/> */}
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                message: "Invalid email",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="social">Social Media</label>
          <select {...register("social", { required: "Please select a platform" })}>
            <option value="">Select a platform</option>
            {socialOptions.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <p className="error">{errors.social?.message}</p>
        </div>
        <div className="form-control">    
        <PlanDropdowns 
          response={response} 
          register={register}
          watch={watch}
        />
        </div>

        <button>Submit</button>
        <button onClick={() => reset()}>Reset</button>
        <DevTool control={control} />
      </form>
    </div>
  );
};

export default YoutubeForm;
