import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Navigate } from "react-router-dom";
import { UserData } from "../interfaces/user";
import { Category } from "../interfaces/category";
import apiClient from "../config/axiosClient";

interface MyContextType {
  whereStay: string;
  setWhereStay: (site: string) => void;
  isLoggedIn: boolean;
  handleLogin: (JWT: string, user:UserData) => void;
  handleLoguot: () => void;
  user: UserData | null;
  setUser:(userToUpdate:UserData)=>void;
  categories:Category[] | null;
}

export const AppContext = createContext<MyContextType>({
  whereStay: "",
  isLoggedIn: false,
  setWhereStay: () => {},
  handleLoguot: () => {},
  handleLogin: () => {},
  user: { name: "", spents: [], surname: "",id:0,salary:0 },
  setUser:()=>{},
  categories:[],
});

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [whereStay, setWhereStay] = useState("registrarme");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [categories, setCategories] = useState<Category[] | null>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);
  const handleSetUsername = (site: string) => {
    setWhereStay(site);
  };


  const handleLogin = (
    JWT: string,
    userData: UserData | null) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", JWT);
    setUser(userData);
  };

  const handleLoguot = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" />;
  };

  const fetchCategories = async()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.get(
        "/spentcategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.ok) {
        const newCategories = response.data.data;
        setCategories(newCategories);
      } else {
        throw new Error("Error fetch categories")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  

  const contextValue: MyContextType = {
    whereStay,
    setWhereStay: handleSetUsername,
    isLoggedIn,
    handleLogin,
    handleLoguot,
    user,
    setUser,
    categories
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
