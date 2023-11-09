import './LinkButton.css'

// Permite navegar entre diferentes vistas
import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title}) => {

     const navigate = useNavigate();

     return (
         <div className="linkButtonStyle" onClick={()=>navigate(path)}>
            {title}
         </div>
     )
}