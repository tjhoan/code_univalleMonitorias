const controller = {}
const { transporter, mailOptions } = require("../helpers/mailer");

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("SELECT * FROM monitor", (err, monitores) => {
      if (err) {
        res.json(err)
      }
      res.render("monitores", {
        data: monitores
      })
    }) 
  })
}
 
controller.listEstudiante = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("SELECT * FROM estudiante", (err, estudiantes) => {
      if (err) {
        res.json(err)
      }
      res.render("estudiantes", {
        data: estudiantes
      })
    }) 
  })
}

controller.listEdicionEstudiante = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("SELECT * FROM estudiante", (err, crud_estudiante) => {
      if (err) {
        res.json(err)
      }
      res.render("./administrador/crud_estudiante", {
        data: crud_estudiante
      })
    }) 
  })
}

controller.listEdicionEstudiante_delete = (req, res) => {
  const { codigo_estudiante } = req.params
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("DELETE FROM estudiante WHERE codigo_estudiante = ?", [codigo_estudiante], (err, crud_estudiante) => {
      if (err) {
        res.json(err)
      }
      console.log("estudiante eliminado correctamente")
      res.redirect("/admin")
    }) 
  })
}

controller.listEdicionEstudiante_update = (req, res) => {
  const { codigo_estudiante } = req.params
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("SELECT * FROM estudiante WHERE codigo_estudiante = ?", [codigo_estudiante], (err, crud_estudiante) => {
      if (err) {
        res.json(err)
      } else if (!err) {
        res.render("./administrador/estudiante_update", {
          data: crud_estudiante
        })
      }
    }) 
  })
}

controller.editarEstudiante = (req, res) => {
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
  req.getConnection((err, conn) => {
    conn.query("UPDATE estudiante SET ? WHERE codigo_estudiante = ?", [studentData, codigo_estudiante], (err, rows) => {	
      if (err) {
        res.json(err)
      } else {
        console.log("estudiante actualizado correctamente")
        res.redirect("/admin")
      }
    })
  })
}

controller.editarMonitor = (req, res) => {
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
  req.getConnection((err, conn) => {
    conn.query("UPDATE monitor SET ? WHERE codigo_monitor = ?", [studentData, codigo_monitor], (err, rows) => {	
      if (err) {
        res.json(err)
      } else {
        console.log("monitor actualizado correctamente")
        res.redirect("/admin")
      }
    })
  })
}

controller.login = (req, res) => {
  res.render("login")
}

controller.signUp = (req, res) => {
  res.render("signUp")
}

controller.perfil_monitor = (req, res) => {
  res.render("perfil_monitor")
}

controller.monitor_funciones = (req, res) => {
  res.render("monitor_funciones")
}

controller.loginForm = (req, res) => {
  const data = req.body
  console.log(data.email)
  console.log(data.password)

  req.getConnection((err, connection) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    connection.query("SELECT * FROM estudiante WHERE email_estudiante = ? AND password_estudiante = ?",[data.email, data.password],
    (err, results) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err)
          return res.status(500).send("Error interno del servidor")
        } else if (results.length > 0) {
          console.log("¡Bienvenido, estudiante!")
          res.redirect("/monitores")
        } else { connection.query("SELECT * FROM monitor WHERE email_monitor = ? AND password_monitor = ?",[data.email, data.password],
            (err, results) => {
              if (err) {
                console.error("Error al ejecutar la consulta:", err)
                return res.status(500).send("Error interno del servidor")
              } else if (results.length > 0) {
                console.log("¡Bienvenido, monitor!")
                res.redirect("/estudiantes")
              } else { connection.query("SELECT * FROM administrador WHERE email_administrador = ? AND password_administrador = ?",[data.email, data.password],
                (err, results) => {
                  if (err) {
                    console.error("Error al ejecutar la consulta:", err)
                    return res.status(500).send("Error interno del servidor")
                  } else if (results.length > 0) {
                    console.log("¡Bienvenido, admin!")
                    res.redirect("/admin")
                  } else if (!results.length > 0) {
                    res.render("login", {
                    alerta: "Los datos ingresados no son correctos",
                    })
                  }
                })}
            }
        )}
    })
  })
}

controller.loginSignUp = (req, res) => {
  const data = req.body

  if (data.password_estudiante != data.password_estudiante_confirm) {
    res.render("signUp", {
      alerta: "Las contraseñas no coinciden",
    })
  } else {
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

    const validateStudentData = (data) => {
      const traeNumeros = /^[A-Za-z\s]+$/;
    
      for (const [key, value] of Object.entries(data)) {
        switch (key) {
          case 'nombre_estudiante':
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'El nombre del estudiante debe ser texto y no contener números' };
            }
            break;
    
          case 'apellido_estudiante':
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'El apellido del estudiante debe ser texto y no contener números' };
            }
            break;
    
          case 'email_estudiante':
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
            if (typeof value !== 'string' || value.length <= 4) {
              return { valid: false, message: 'La contraseña debe tener más de 5 caracteres' };
            }
            break;

          case 'password_estudiante_confirm':
            if (typeof value !== 'string' || value.length <= 4) {
              return { valid: false, message: 'La confirmacion de la contraseña debe tener más de 5 caracteres' };
            }
            break;
    
          case 'codigo_estudiante':
            if (isNaN(value)) {
              return { valid: false, message: 'El código del estudiante debe ser numérico' };
            }
            break;
    
          case 'carrera_estudiante':
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'La carrera del estudiante debe ser seleccionado' };
            }
            break;
    
          case 'sede_estudiante':
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'La sede del estudiante debe ser seleccionado' };
            }
            break;
    
          case 'semestre_estudiante':
            if (typeof value !== 'string' || !traeNumeros.test(value)) {
              return { valid: false, message: 'El semestre del estudiante debe ser seleccionado' };
            }
            break;
    
          default:
            return { valid: false, message: `Campo ${key} no reconocido` };
        }
      }
      return { valid: true };
    };

    const validation = validateStudentData(data);
    if (!validation.valid) {
      res.render("signUp", {
        alerta: validation.message,
      });
    } else {
      req.getConnection((err, connection) => {
        if (err) {
          console.error("Error al conectar con la base de datos:", err)
          res.render("signUp", {
            alerta: "Hay algun error",
          })
        }
        connection.query("INSERT INTO estudiante SET ?", [studentData],
          (err, results) => {
            if (err) {
              console.error("Error al ejecutar la consulta:", err)
              res.render("signUp", {
                alerta: "Este usuario ya esta registrado",
              })
            } else {
              console.log("¡Estudiante registrado!")
              res.redirect("/monitores")
            }
          }
        )
      })
    }
  }
}

controller.PerfilMonitor = (req, res) => {
  const { codigo_monitor } = req.params
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("SELECT * FROM monitor WHERE codigo_monitor = ?", [codigo_monitor], (err, data_monitor) => {
      if (err) {
        res.json(err)
      } else if (!err) {
        res.render("perfil_monitor", { 
          data: data_monitor
        })
      }
    }) 
  })
}

controller.sendEmail = (req, res) => {
  const data = req.body
  mailOptions.to = data.to;
  mailOptions.subject = data.subject;
  mailOptions.body = data.message;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    } else {
      res.redirect("monitores")
      console.log(`Correo enviado a ${mailOptions.to} con exito`);
    }
  });
}

controller.admin = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err);
      return res.status(500).send("Error interno del servidor");
    }
    conn.query("SELECT * FROM estudiante", (err, data_estudiante) => {
      if (err) {
        console.error("Error al obtener datos de estudiantes:", err);
        return res.status(500).send("Error interno del servidor");
      }
      conn.query("SELECT * FROM monitor", (err, data_monitor) => {
        if (err) {
          console.error("Error al obtener datos de monitores:", err);
          return res.status(500).send("Error interno del servidor");
        }
        res.render("./administrador/admin", {
          data_estudiante: data_estudiante,
          data_monitor: data_monitor
        });
      });
    });
  });
}

controller.listEdicionMonitor_delete = (req, res) => {
  const { codigo_monitor } = req.params
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("DELETE FROM monitor WHERE codigo_monitor = ?", [codigo_monitor], (err, crud_monitor) => {
      if (err) {
        res.json(err)
      }
      console.log("monitor eliminado correctamente")
      res.redirect("/admin")
    }) 
  })
}

controller.listEdicionMonitor_update = (req, res) => {
  const { codigo_monitor } = req.params
  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error al conectar con la base de datos:", err)
      return res.status(500).send("Error interno del servidor")
    }
    conn.query("SELECT * FROM monitor WHERE codigo_monitor = ?", [codigo_monitor], (err, crud_monitor) => {
      if (err) {
        res.json(err)
      } else if (!err) {
        res.render("./administrador/monitor_update", {
          data: crud_monitor
        })
      }
    }) 
  })
}

controller.crear_estudiante = (req, res) => {
  res.render("./administrador/crear_estudiante")
}

controller.crear_monitor = (req, res) => {
  res.render("./administrador/crear_monitor")
}

controller.save_estudiante = (req, res) => {
  const data = req.body
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

  console.log(studentData)
  const validateStudentData = (data) => {
    const traeNumeros = /^[A-Za-z\s]+$/;
  
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case 'nombre_estudiante':
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El nombre del estudiante debe ser texto y no contener números' };
          }
          break;
  
        case 'apellido_estudiante':
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El apellido del estudiante debe ser texto y no contener números' };
          }
          break;
  
        case 'email_estudiante':
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
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La contraseña debe tener más de 5 caracteres' };
          }
          break;

        case 'password_estudiante_confirm':
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La confirmacion de la contraseña debe tener más de 5 caracteres' };
          }
          break;
  
        case 'codigo_estudiante':
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
    return { valid: true };
  };

  const validation = validateStudentData(data);
  if (!validation.valid) {
    res.render("./administrador/crear_estudiante", {
      alerta: validation.message,
    });
  } else {
    req.getConnection((err, connection) => {
      if (err) {
        console.error("Error al conectar con la base de datos:", err)
        res.render("./administrador/crear_estudiante", {
          alerta: "Hay algun error",
        })
      }
      connection.query("INSERT INTO estudiante SET ?", [studentData],
        (err, results) => {
          if (err) {
            console.error("Error al ejecutar la consulta:", err)
            res.render("./administrador/crear_estudiante", {
              alerta: "Este usuario ya esta registrado",
            })
          } else {
            console.log("Se han guardado los datos del estudiante")
            res.redirect("/admin")
          }
        }
      )
    })
  }
}

controller.save_monitor = (req, res) => {
  const data = req.body
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

  console.log(monitorData)
  const validateMonitorData = (data) => {
    const traeNumeros = /^[A-Za-z\s]+$/;
  
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case 'nombre_monitor':
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El nombre del monitor debe ser texto y no contener números' };
          }
          break;
  
        case 'apellido_monitor':
          if (typeof value !== 'string' || !traeNumeros.test(value)) {
            return { valid: false, message: 'El apellido del monitor debe ser texto y no contener números' };
          }
          break;
  
        case 'email_monitor':
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
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La contraseña debe tener más de 5 caracteres' };
          }
          break;

        case 'password_monitor_confirm':
          if (typeof value !== 'string' || value.length <= 4) {
            return { valid: false, message: 'La confirmacion de la contraseña debe tener más de 5 caracteres' };
          }
          break;
  
        case 'codigo_monitor':
          if (isNaN(value)) {
            return { valid: false, message: 'El código del monitor debe ser numérico' };
          }
          break;

        case 'cedula_monitor':
          if (isNaN(value)) {
            return { valid: false, message: 'La cedula del monitor debe ser numérico' };
          }
          break;

        case 'numero_monitor':
          if (isNaN(value)) {
            return { valid: false, message: 'El numero del monitor debe ser numérico' };
          }
          break;
  
        case 'carrera_monitor':
        case 'sede_monitor':
        case 'semestre_monitor':
          break
  
        default:
          return { valid: false, message: `Campo ${key} no reconocido` };
      }
    }
    return { valid: true };
  };

  const validation = validateMonitorData(data);
  if (!validation.valid) {
    res.render("./administrador/crear_monitor", {
      alerta: validation.message,
    });
  } else {
    req.getConnection((err, connection) => {
      if (err) {
        console.error("Error al conectar con la base de datos:", err)
        res.render("./administrador/crear_monitor", {
          alerta: "Hay algun error",
        })
      }
      connection.query("INSERT INTO monitor SET ?", [monitorData],
        (err, results) => {
          if (err) {
            console.error("Error al ejecutar la consulta:", err)
            res.render("./administrador/crear_monitor", {
              alerta: "Este usuario ya esta registrado",
            })
          } else {
            console.log("Se han guardado los datos del monitor")
            res.redirect("/admin")
          }
        }
      )
    })
  }
}

module.exports = controller