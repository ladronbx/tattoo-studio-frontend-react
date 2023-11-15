USUARIO SIN LOGEAR:

   <!-- navbar (elemento fijo) => acceso a: Home, Register, login, getWorkers, getTattoos -->
1. Home (div deshabilitado de welcome, se habilita cuando te logeas) +
    - imagen principal
    - footer
    - titulo
    - logo

<!-- 2. Register +
    - imagen decorativa
    - inputs (full_name, email, password, phone_number, image)
    - boton create/ sign up/ register user (cuando se cree, mensaje: usuario creado con exito) -->

<!-- 3. Login +
    - imagen decorativa
    - email
    - password
    - boton log in -->

<!-- 4. GetWorkers (estudiar el contenido) +
    - cards con la info de los trabajadores (full_name, foto, email)  -->

<!-- 5. GetTattoos (toggle [para expandir una card al hacer click])
    - cards con la info del tatu/piercing (name, category, price, image)
    - (toggle [para expandir una card al hacer click]) -->   

------------------------------------------------------------------------

USUARIO LOGEADO:

<!-- navbar (elemento fijo) => acceso a: getWorkers, getTattoos, profile, appointments, logout [boton que te lleva a Home y borra el token] -->
<!-- 6. Profile +
    - info user
    - boton para actualizar la info del user (update user profile) -->
<!-- 7. Update user profile +
    - inputs (full_name, password, phone_number, image) -->
<!-- 8. Appointments, secciones: +
    - botón para acceder a create appointment
    - cards que muestran los appointments (toggle [para expandir una card al hacer click])
    - Las propias cards tienen 2 botones, [1 de delete, no es obligatorio] y 1 de update (te lleva a la vista update appointment) -->
<!-- 9. Create appointment +
    - inputs (date, shift, email, portfolio_id) -->
<!-- 10. Update appointment +
    - inputs (id, date, shift, email, name) -->

SUPER ADMIN:

Cuando se logea el super admin:
<!-- navbar (elemento fijo) => acceso a: getAllUsers, GetAllAppointments, getWorkers, getTattoos, profile, appointments, logout [boton que te lleva a Home y borra el token] -->
<!-- 12. GetAllUsers +
    - cards que muestran los users (toggle [para expandir una card al hacer click]) -->
<!-- 13. GetAllAppointments +
    - cards que muestran los appointments (toggle [para expandir una card al hacer click]) -->

----------------------------------
14. Create worker
    - inputs (full_name, email, password, phone_number, image)
14. changeRole by super admin
----------------------------------

16. Busqueda (DELUXE)

/--------------------------------------------------------------------------------
 
ESCRITURA DE REDUX
Para meter en el almacen de redux:
1. lo importo:
    import { useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
    import { login } from "../userSlice";

2. lo instanciamos:
    const dispatch = useDispatch();

3. lo introduzco:
    dispatch(login({ credentials: resultado.data }))

LECTURA DE REDUX:
Para obtener el dato de redux:
1. lo importo:
    import { useSelector } from "react-redux";
    import userSlice from "../userSlice";

2. Lo instanciamos o conectamos RDX en modo lectura
    const rdxToken = useSelector(selectToken);

3. Ahora ya tengo el valor del token almacenado para usarlos

IDEA!!!
en el register sustituir el navigate a login por la logica del login con un navigate a profile.

CREAR COSAS!!
un boton de delete para los appointments, el delete justo debajo del update como ha dicho Bienve quedaria canela aprovechando que en el boton de update ya tenemos la logica que rescata el id para poder usarla en el update, pues exactamente lo mismo pero en lugar de llamar al endpoint de update, llama al de delete, y aparcao

una vista para cambiar el role del usuario por parte del super admin

En update y create appointment un componente que sea un desplegable para elegir el worker y otro para elegir el producto (esto quizas sea fumarnos por la dificultad)