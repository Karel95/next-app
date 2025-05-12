"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  // Redirect to another page after successful registration
    const router = useRouter();
    
  /////////////////////////////////////////////////////////////
  // // This is a just simple example, we won't use this way //
  /////////////////////////////////////////////////////////////
  // // State to hold form data
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form Data:', formData);
  // };

  /////////////////////////////////////////////
  // Using react-hook-form for form handling //
  /////////////////////////////////////////////
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Check if password and confirm password match
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // // Log the form data only for demonstration
    // // you should not log sensitive data like passwords
    // console.log(data);

    // Handle form submission logic here
    // For example, send data to your API or perform validation
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      } as Inputs),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // Handle successful registration
      console.log("Registration successful");
      // Redirect to the login page
      router.push("/auth/login");
    } else {
      // Handle registration error
      console.error("Registration failed");
    }
    const res = await response.json();
    console.log(res);
  };

  // // Watch the input values
  // console.log(watch("name")); // watch input value by passing the name of it
  // console.log(watch("email")); // watch input value by passing the name of it
  // console.log(watch("password")); // watch input value by passing the name of it
  // console.log(watch("confirmPassword")); // watch input value by passing the name of it

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              // value={formData.name}
              // onChange={handleChange}
              {...register("name", { required: true })}
              placeholder="John Doe"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              // value={formData.email}
              // onChange={handleChange}
              {...register("email", { required: true })}
              placeholder="johndoe@email.com"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              // value={formData.password}
              // onChange={handleChange}
              {...register("password", { required: true })}
              placeholder="********"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              // value={formData.password}
              // onChange={handleChange}
              {...register("confirmPassword", { required: true })}
              placeholder="********"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.name && <span>This field is required</span>}
          {errors.email && <span>This field is required</span>}
          {errors.password && <span>This field is required</span>}
          {errors.confirmPassword && <span>This field is required</span>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Do you already have an account?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
