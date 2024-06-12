// Definimos el objeto `controller` que contendrá todas nuestras funciones de controlador
const controller = {}

// Importamos `transporter` y `mailOptions` desde el módulo `mailer` en la carpeta `helpers` para poder enviar correos
const { transporter, mailOptions } = require("../helpers/mailer");

// Función para listar todos los monitores
controller.list = (req, res) => {
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Manejamos errores de conexión
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    // Consultamos todos los monitores en la base de datos
    conn.query("SELECT * FROM monitor", (err, monitores) => {
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      }
      // Renderizamos la vista `monitores` y pasamos los datos obtenidos
      res.render("monitores", {
        data: monitores
      })
    }) 
  })
}

// Función para listar todos los estudiantes
controller.listEstudiante = (req, res) => {
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Manejamos errores de conexión
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    // Consultamos todos los estudiantes en la base de datos
    conn.query("SELECT * FROM estudiante", (err, estudiantes) => {
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      }
      // Renderizamos la vista `estudiantes` y pasamos los datos obtenidos
      res.render("estudiantes", {
        data: estudiantes
      })
    }) 
  })
}

// Función para listar y editar estudiantes
controller.listEdicionEstudiante = (req, res) => {
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Manejamos errores de conexión
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    // Consultamos todos los estudiantes en la base de datos
    conn.query("SELECT * FROM estudiante", (err, crud_estudiante) => {
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      }
      // Renderizamos la vista `crud_estudiante` y pasamos los datos obtenidos
      res.render("./administrador/crud_estudiante", {
        data: crud_estudiante
      })
    }) 
  })
}

// Función para eliminar un estudiante
controller.listEdicionEstudiante_delete = (req, res) => {
  // Obtenemos el `codigo_estudiante` de los parámetros de la solicitud
  const { codigo_estudiante } = req.params
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Manejamos errores de conexión
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    // Eliminamos el estudiante con el código proporcionado de la base de datos
    conn.query("DELETE FROM estudiante WHERE codigo_estudiante = ?", [codigo_estudiante], (err, crud_estudiante) => {
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      }
      // Mensaje de éxito en la consola
      console.log("estudiante eliminado correctamente")
      // Redirigimos a la vista `/admin`
      res.redirect("/admin")
    }) 
  })
}

// Función para listar y editar un estudiante específico
controller.listEdicionEstudiante_update = (req, res) => {
  // Obtenemos el `codigo_estudiante` de los parámetros de la solicitud
  const { codigo_estudiante } = req.params
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Manejamos errores de conexión
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    // Consultamos el estudiante con el código proporcionado en la base de datos
    conn.query("SELECT * FROM estudiante WHERE codigo_estudiante = ?", [codigo_estudiante], (err, crud_estudiante) => {
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      } else {
        // Renderizamos la vista `estudiante_update` y pasamos los datos obtenidos
        res.render("./administrador/estudiante_update", {
          data: crud_estudiante
        })
      }
    }) 
  })
}

// Función para manejar la vista del perfil de un monitor
controller.PerfilMonitor = (req, res) => {
  const { codigo_monitor } = req.params // Obtener el código del monitor de los parámetros de la solicitud
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor") // Enviar un error si no se puede conectar a la base de datos
    }
    // Consultar los datos del monitor en la base de datos
    conn.query("SELECT * FROM monitor WHERE codigo_monitor = ?", [codigo_monitor], (err, data_monitor) => {
      if (err) {
        res.json(err) // Enviar un error si no se puede ejecutar la consulta
      } else if (!err) {
        res.render("perfil_monitor", { 
          data: data_monitor // Renderizar la vista del perfil del monitor con los datos obtenidos
        })
      }
    }) 
  })
}

// Función para editar un estudiante en BD
controller.editarEstudiante = (req, res) => {
  // Obtenemos los datos del cuerpo de la solicitud
  const data = req.body
  const { nombre_estudiante, apellido_estudiante, email_estudiante, password_estudiante, codigo_estudiante, carrera_estudiante, sede_estudiante, semestre_estudiante } = data;
  const studentData = {
    codigo_estudiante,
    nombre_estudiante,
    apellido_estudiante,
    password_estudiante,
    email_estudiante,
    carrera_estudiante,
    sede_estudiante,
    semestre_estudiante
  };
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Actualizamos el estudiante en la base de datos con los datos proporcionados
    conn.query("UPDATE estudiante SET ? WHERE codigo_estudiante = ?", [studentData, codigo_estudiante], (err, rows) => {  
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      } else {
        console.log("Estudiante actualizado correctamente")
        res.redirect("/admin")
      }
    })
  })
}

// Función para editar un monitor en BD
controller.editarMonitor = (req, res) => {
  // Obtenemos los datos del cuerpo de la solicitud
  const data = req.body
  const { nombre_monitor, apellido_monitor, email_monitor, password_monitor, codigo_monitor, carrera_monitor, sede_monitor, semestre_monitor, cedula_monitor, numero_monitor } = data;
  const studentData = {
    nombre_monitor,
    apellido_monitor,
    email_monitor,
    password_monitor,
    codigo_monitor,
    carrera_monitor,
    sede_monitor,
    semestre_monitor, 
    cedula_monitor,
    numero_monitor
  };
  // Obtenemos una conexión a la base de datos
  req.getConnection((err, conn) => {
    // Actualizamos el monitor en la base de datos con los datos proporcionados
    conn.query("UPDATE monitor SET ? WHERE codigo_monitor = ?", [studentData, codigo_monitor], (err, rows) => {  
      // Manejamos errores de consulta
      if (err) {
        res.json(err)
      } else {
        console.log("Monitor actualizado correctamente")
        res.redirect("/admin")
      }
    })
  })
}

// Función para renderizar la vista de login
controller.login = (req, res) => {
  res.render("login")
}

// Función para renderizar la vista de registro
controller.signUp = (req, res) => {
  res.render("signUp")
}

// Función para renderizar la vista de perfil del monitor
controller.perfil_monitor = (req, res) => {
  res.render("perfil_monitor")
}

// Función para renderizar la vista de funciones del monitor
controller.monitor_funciones = (req, res) => {
  res.render("monitor_funciones")
}

// Función para manejar el formulario de login
controller.loginForm = (req, res) => {
  const data = req.body
  console.log(data.email)
  console.log(data.password)

  // Obtenemos una conexión a la base de datos
  req.getConnection((err, connection) => {
    // Manejamos errores de conexión
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    // Consultamos los datos del estudiante en la base de datos
    connection.query("SELECT * FROM estudiante WHERE email_estudiante = ? AND password_estudiante = ?",[data.email, data.password],
    (err, results) => {
        // Manejamos errores de consulta
        if (err) {
          console.error("Error al ejecutar la consulta:", err)
          return res.status(500).send("Error interno del servidor")
        } else if (results.length > 0) {
          console.log("¡Bienvenido, estudiante!")
          res.redirect("/monitores")
        } else {
          // Consultamos los datos del monitor en la base de datos
          connection.query("SELECT * FROM monitor WHERE email_monitor = ? AND password_monitor = ?",[data.email, data.password],
            (err, results) => {
              // Manejamos errores de consulta
              if (err) {
                console.error("Error al ejecutar la consulta:", err)
                return res.status(500).send("Error interno del servidor")
              } else if (results.length > 0) {
                console.log("¡Bienvenido, monitor!")
                res.redirect("/estudiantes")
              } else {
                // Consultamos los datos del administrador en la base de datos
                connection.query("SELECT * FROM administrador WHERE email_administrador = ? AND password_administrador = ?",[data.email, data.password],
                (err, results) => {
                  // Manejamos errores de consulta
                  if (err) {
                    console.error("Error al ejecutar la consulta:", err)
                    return res.status(500).send("Error interno del servidor")
                  } else if (results.length > 0) {
                    console.log("¡Bienvenido, admin!")
                    res.redirect("/admin")
                  } else {
                    // Si no se encuentra ninguna coincidencia, renderizamos la vista de login con una alerta
                    res.render("login", {
                      alerta: "Los datos ingresados no son correctos",
                    })
                  }
                })
              }
            }
          )
        }
    })
  })
}

// Función para manejar el registro de un nuevo estudiante
controller.loginSignUp = (req, res) => {
  const data = req.body // Obtener los datos enviados en la solicitud

  // Verificar si las contraseñas coinciden
  if (data.password_estudiante != data.password_estudiante_confirm) {
    // Si las contraseñas no coinciden, renderizar la vista de registro con una alerta
    res.render("signUp", {
      alerta: "Las contraseñas no coinciden",
    })
  } else {
    // Desestructurar los datos del estudiante
    const { nombre_estudiante, apellido_estudiante, email_estudiante, password_estudiante, codigo_estudiante, carrera_estudiante, sede_estudiante, semestre_estudiante } = data;
    const studentData = {
      nombre_estudiante,
      apellido_estudiante,
      email_estudiante,
      password_estudiante,
      codigo_estudiante,
      carrera_estudiante,
      sede_estudiante,
      semestre_estudiante
    };

    // Función para validar los datos del estudiante
    const validateStudentData = (data) => {
      const traeNumeros = /^[A-Za-z\s]+$/; // Expresión regular para verificar que el texto no contenga números
    
      // Recorrer cada campo de los datos del estudiante
      for (const [key, value] of Object.entries(data)) {
        switch (key) {
          case 'nombre_estudiante':
            // Validar que el nombre no contenga números
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'El nombre del estudiante debe ser texto y no contener números' };
            }
            break;
    
          case 'apellido_estudiante':
            // Validar que el apellido no contenga números
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'El apellido del estudiante debe ser texto y no contener números' };
            }
            break;
    
          case 'email_estudiante':
            // Validar el formato del email y que el dominio no contenga números
            const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const domainPart = value.split('@')[1];
            const validNumeros = /\d/.test(domainPart);
    
            if (!validEmail.test(value)) {
              return { valid: false, message: 'El email es inválido' };
            } else if (validNumeros) {
              return { valid: false, message: 'El dominio del email no debe contener números' };
            }
            break;
    
          case 'password_estudiante':
            // Validar que la contraseña tenga más de 5 caracteres
            if (typeof value !== 'string' || value.length <= 4) {
              return { valid: false, message: 'La contraseña debe tener más de 5 caracteres' };
            }
            break;

          case 'password_estudiante_confirm':
            // Validar que la confirmación de la contraseña tenga más de 5 caracteres
            if (typeof value !== 'string' || value.length <= 4) {
              return { valid: false, message: 'La confirmacion de la contraseña debe tener más de 5 caracteres' };
            }
            break;
    
          case 'codigo_estudiante':
            // Validar que el código del estudiante sea numérico
            if (isNaN(value)) {
              return { valid: false, message: 'El código del estudiante debe ser numérico' };
            }
            break;
    
          case 'carrera_estudiante':
          case 'sede_estudiante':
          case 'semestre_estudiante':
            break
    
          default:
            return { valid: false, message: `Campo ${key} no reconocido` };
        }
      }
      return { valid: true }; // Si todos los campos son válidos, devolver true
    };

    const validation = validateStudentData(data); // Validar los datos del estudiante
    if (!validation.valid) {
      // Si la validación falla, renderizar la vista de registro con la alerta correspondiente
      res.render("signUp", {
        alerta: validation.message,
      });
    } else {
      // Conectar a la base de datos y registrar al estudiante
      req.getConnection((err, connection) => {
        if (err) {
          console.error("Error al conectar con la base de datos:", err)
          res.render("signUp", {
            alerta: "Hay algun error",
          })
        }
        // Insertar los datos del estudiante en la base de datos
        connection.query("INSERT INTO estudiante SET ?", [studentData],
          (err, results) => {
            if (err) {
              console.error("Error al ejecutar la consulta:", err)
              res.render("signUp", {
                alerta: "Este usuario ya esta registrado",
              })
            } else {
              console.log("¡Estudiante registrado!")
              res.redirect("/monitores") // Redirigir a la página de monitores
            }
          }
        )
      })
    }
  }
}

// Función para enviar un correo electrónico
controller.sendEmail = (req, res) => {
  const data = req.body; // Obtener los datos enviados en la solicitud
  mailOptions.to = data.to;
  mailOptions.subject = data.subject;
  mailOptions.body = data.message;
  
  // Enviar el correo electrónico utilizando el transportador configurado
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error); // Mostrar error si ocurre
    } else {
      res.redirect("monitores"); // Redirigir a la página de monitores
      console.log(`Correo enviado a ${mailOptions.to} con exito`);
    }
  });
}

// Función para la vista del administrador
controller.admin = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err);
      return res.status(500).send("Error interno del servidor"); // Enviar error si no se puede conectar
    }
    
    // Consultar los datos de estudiantes
    conn.query("SELECT * FROM estudiante", (err, data_estudiante) => {
      if (err) {
        console.error("Error al obtener datos de estudiantes:", err);
        return res.status(500).send("Error interno del servidor"); // Enviar error si ocurre
      }
      
      // Consultar los datos de monitores
      conn.query("SELECT * FROM monitor", (err, data_monitor) => {
        if (err) {
          console.error("Error al obtener datos de monitores:", err);
          return res.status(500).send("Error interno del servidor"); // Enviar error si ocurre
        }
        
        // Renderizar la vista del administrador con los datos obtenidos
        res.render("./administrador/admin", {
          data_estudiante: data_estudiante,
          data_monitor: data_monitor
        });
      });
    });
  });
}

// Función para eliminar un monitor
controller.listEdicionMonitor_delete = (req, res) => {
  const { codigo_monitor } = req.params; // Obtener el código del monitor de los parámetros de la solicitud
  
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err);
      return res.status(500).send("Error interno del servidor"); // Enviar error si no se puede conectar
    }
    
    // Eliminar el monitor con el código especificado
    conn.query("DELETE FROM monitor WHERE codigo_monitor = ?", [codigo_monitor], (err, crud_monitor) => {
      if (err) {
        res.json(err); // Enviar error si ocurre
      } else {
        console.log("Monitor eliminado correctamente");
        res.redirect("/admin"); // Redirigir a la página del administrador
      }
    });
  });
}

// Función para obtener los datos de un monitor y renderizar la vista de actualización
controller.listEdicionMonitor_update = (req, res) => {
  const { codigo_monitor } = req.params; // Obtener el código del monitor de los parámetros de la solicitud
  
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err);
      return res.status(500).send("Error interno del servidor"); // Enviar error si no se puede conectar
    }
    
    // Consultar los datos del monitor con el código especificado
    conn.query("SELECT * FROM monitor WHERE codigo_monitor = ?", [codigo_monitor], (err, crud_monitor) => {
      if (err) {
        res.json(err); // Enviar error si ocurre
      } else {
        // Renderizar la vista de actualización del monitor con los datos obtenidos
        res.render("./administrador/monitor_update", {
          data: crud_monitor
        });
      }
    });
  });
}

// Función para renderizar la vista de creación de estudiantes
controller.crear_estudiante = (req, res) => {
  res.render("./administrador/crear_estudiante");
}

// Función para renderizar la vista de creación de monitores
controller.crear_monitor = (req, res) => {
  res.render("./administrador/crear_monitor");
}

// Función para guardar los datos de un estudiante
controller.save_estudiante = (req, res) => {
  const data = req.body; // Obtener los datos enviados en la solicitud
  const { nombre_estudiante, apellido_estudiante, email_estudiante, password_estudiante, codigo_estudiante, carrera_estudiante, sede_estudiante, semestre_estudiante } = data;
  const studentData = {
    nombre_estudiante,
    apellido_estudiante,
    email_estudiante,
    password_estudiante,
    codigo_estudiante,
    carrera_estudiante,
    sede_estudiante,
    semestre_estudiante
  };

  console.log(studentData);

  // Función para validar los datos del estudiante
  const validateStudentData = (data) => {
    const traeNumeros = /^[A-Za-z\s]+$/; // Expresión regular para verificar que el texto no contenga números
  
    // Recorrer cada campo de los datos del estudiante
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case 'nombre_estudiante':
          // Validar que el nombre no contenga números
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El nombre del estudiante debe ser texto y no contener números' };
          }
          break;
  
        case 'apellido_estudiante':
          // Validar que el apellido no contenga números
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El apellido del estudiante debe ser texto y no contener números' };
          }
          break;
  
        case 'email_estudiante':
          // Validar el formato del email y que el dominio no contenga números
          const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const domainPart = value.split('@')[1];
          const validNumeros = /\d/.test(domainPart);
  
          if (!validEmail.test(value)) {
            return { valid: false, message: 'El email es inválido' };
          } else if (validNumeros) {
            return { valid: false, message: 'El dominio del email no debe contener números' };
          }
          break;
  
        case 'password_estudiante':
          // Validar que la contraseña tenga más de 5 caracteres
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La contraseña debe tener más de 5 caracteres' };
          }
          break;

        case 'password_estudiante_confirm':
          // Validar que la confirmación de la contraseña tenga más de 5 caracteres
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La confirmacion de la contraseña debe tener más de 5 caracteres' };
          }
          break;
  
        case 'codigo_estudiante':
          // Validar que el código del estudiante sea numérico
          if (isNaN(value)) {
            return { valid: false, message: 'El código del estudiante debe ser numérico' };
          }
          break;
  
        case 'carrera_estudiante':
        case 'sede_estudiante':
        case 'semestre_estudiante':
          break;
  
        default:
          return { valid: false, message: `Campo ${key} no reconocido` };
      }
    }
    return { valid: true }; // Si todos los campos son válidos, devolver true
  };

  const validation = validateStudentData(data); // Validar los datos del estudiante
  if (!validation.valid) {
    // Si la validación falla, renderizar la vista de creación de estudiante con la alerta correspondiente
    res.render("./administrador/crear_estudiante", {
      alerta: validation.message,
    });
  } else {
    // Conectar a la base de datos y guardar los datos del estudiante
    req.getConnection((err, connection) => {
      if (err) {
        console.error("Error al conectar con la base de datos:", err);
        res.render("./administrador/crear_estudiante", {
          alerta: "Hay algun error",
        });
      }
      // Insertar los datos del estudiante en la base de datos
      connection.query("INSERT INTO estudiante SET ?", [studentData],
        (err, results) => {
          if (err) {
            console.error("Error al ejecutar la consulta:", err);
            res.render("./administrador/crear_estudiante", {
              alerta: "Este usuario ya esta registrado",
            });
          } else {
            console.log("Se han guardado los datos del estudiante");
            res.redirect("/admin"); // Redirigir a la página del administrador
          }
        }
      );
    });
  }
}

// Función para guardar los datos de un monitor
controller.save_monitor = (req, res) => {
  const data = req.body; // Obtener los datos enviados en la solicitud
  const { nombre_monitor, apellido_monitor, email_monitor, password_monitor, codigo_monitor, carrera_monitor, sede_monitor, semestre_monitor, cedula_monitor, numero_monitor } = data;
  const monitorData = {
    nombre_monitor,
    apellido_monitor,
    email_monitor,
    password_monitor,
    codigo_monitor,
    carrera_monitor,
    sede_monitor,
    semestre_monitor,
    cedula_monitor,
    numero_monitor
  };

  console.log(monitorData);

  // Función para validar los datos del monitor
  const validateMonitorData = (data) => {
    const traeNumeros = /^[A-Za-z\s]+$/; // Expresión regular para verificar que el texto no contenga números
  
    // Recorrer cada campo de los datos del monitor
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case 'nombre_monitor':
          // Validar que el nombre no contenga números
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El nombre del monitor debe ser texto y no contener números' };
          }
          break;
  
        case 'apellido_monitor':
          // Validar que el apellido no contenga números
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El apellido del monitor debe ser texto y no contener números' };
          }
          break;
  
        case 'email_monitor':
          // Validar el formato del email y que el dominio no contenga números
          const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const domainPart = value.split('@')[1];
          const validNumeros = /\d/.test(domainPart);
  
          if (!validEmail.test(value)) {
            return { valid: false, message: 'El email es inválido' };
          } else if (validNumeros) {
            return { valid: false, message: 'El dominio del email no debe contener números' };
          }
          break;
  
        case 'password_monitor':
          // Validar que la contraseña tenga más de 5 caracteres
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La contraseña debe tener más de 5 caracteres' };
          }
          break;

        case 'password_monitor_confirm':
          // Validar que la confirmación de la contraseña tenga más de 5 caracteres
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La confirmacion de la contraseña debe tener más de 5 caracteres' };
          }
          break;
  
        case 'codigo_monitor':
          // Validar que el código del monitor sea numérico
          if (isNaN(value)) {
            return { valid: false, message: 'El código del monitor debe ser numérico' };
          }
          break;

        case 'cedula_monitor':
          // Validar que la cédula del monitor sea numérica
          if (isNaN(value)) {
            return { valid: false, message: 'La cédula del monitor debe ser numérica' };
          }
          break;

        case 'numero_monitor':
          // Validar que el número del monitor sea numérico
          if (isNaN(value)) {
            return { valid: false, message: 'El número del monitor debe ser numérico' };
          }
          break;
  
        case 'carrera_monitor':
        case 'sede_monitor':
        case 'semestre_monitor':
          break;
  
        default:
          return { valid: false, message: `Campo ${key} no reconocido` };
      }
    }
    return { valid: true }; // Si todos los campos son válidos, devolver true
  };

  const validation = validateMonitorData(data); // Validar los datos del monitor
  if (!validation.valid) {
    // Si la validación falla, renderizar la vista de creación de monitor con la alerta correspondiente
    res.render("./administrador/crear_monitor", {
      alerta: validation.message,
    });
  } else {
    // Conectar a la base de datos y guardar los datos del monitor
    req.getConnection((err, connection) => {
      if (err) {
        console.error("Error al conectar con la base de datos:", err);
        res.render("./administrador/crear_monitor", {
          alerta: "Hay algún error",
        });
      }
      // Insertar los datos del monitor en la base de datos
      connection.query("INSERT INTO monitor SET ?", [monitorData],
        (err, results) => {
          if (err) {
            console.error("Error al ejecutar la consulta:", err);
            res.render("./administrador/crear_monitor", {
              alerta: "Este usuario ya está registrado",
            });
          } else {
            console.log("Se han guardado los datos del monitor");
            res.redirect("/admin"); // Redirigir a la página del administrador
          }
        }
      );
    });
  }
}

module.exports = controller;
