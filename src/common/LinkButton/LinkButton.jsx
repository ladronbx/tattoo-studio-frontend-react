import './LinkButton.css'

// Permite navegar entre diferentes vistas
import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title, classButton}) => {

     const navigate = useNavigate();

     return (
         <div className={classButton} onClick={()=>navigate(path)}>
            {title}
         </div>
     )
}