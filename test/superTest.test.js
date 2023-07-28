import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing Proyecto Final App", () => {
  // Before
  // BeforeEach

  // describe("Testing Products Api", () => {
  //     // Before
  //     // BeforeEach

  //     // Test 01
  //     it("Crear Producto: El API POST /api/products debe crear un nuevo producto correctamente.", async () => {

  //         // Given
  //         const proddMock = {
  //             name: "Patitas",
  //             specie: "pez",
  //             birthDate: "10-10-2023"
  //         }

  //         // Then
  //         const { _body, ok, statusCode } = await requester.post("/api/products").send(prodMock);
  //         // const result = await requester.post("/api/products").send(prodMock);
  //         // console.log(result);

  //         // Assert that
  //         expect(statusCode).is.eqls(201);
  //         expect(_body.payload).is.ok.and.to.have.property('_id');
  //         expect(_body.payload).to.have.property('adopted', false);
  //         expect(_body.payload).to.have.property('adopted').and.to.be.deep.equal(false);
  //         expect(_body.payload).to.have.property('adopted').and.to.be.false;
  //     });

  //     // Test 02
  //     it("Crear Producto sin Código: El API POST /api/products debe retornar un estado HTTP 400 con error", async () => {

  //         // Given
  //         const prodMock = {
  //             name: "Patitas",
  //             specie: "pez",
  //         }

  //         // Then
  //         const { _body, ok, statusCode } = await requester.post("/api/products").send(prodMock);
  //         // const result = await requester.post("/api/products").send(prodMock);
  //         // console.log(result);

  //         // Assert that
  //         expect(statusCode).is.eqls(400);
  //         expect(_body).is.ok.and.to.have.property('error');
  //         expect(_body).to.have.property('status');
  //     })

  // })

  /*=============================================
    =                   Section 02                =
    =============================================*/
  describe("Testing login and session with Cookies:", () => {
    before(function () {
      this.cookie;
      this.mockUser = {
        first_name: "Usuario Testing 2",
        last_name: "Apellido Testing 2",
        email: "test2@gmail.com",
        password: "123456",
      };
    });

    // Test 01
    it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
      //Given:
      // console.log(this.mockUser);

      //Then:
      const { statusCode, ok, _body } = await requester
        .post("/api/sessions/register")
        .send(this.mockUser);
      console.log(statusCode);
      console.log(_body);

      //Assert that:
      expect(statusCode).is.equal(200);
    });

    // Test 02
    it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {
      //Given:
      const mockLogin = {
        email: this.mockUser.email,
        password: this.mockUser.password,
      };

      //Then:
      const result = await requester
        .post("/api/sessions/login")
        .send(mockLogin);
      console.log(result.headers);

      const cookieResult = result.headers["set-cookie"][0];
      console.log(cookieResult);

      //Assert that:
      expect(result.statusCode).is.equal(200);

      const cookieData = cookieResult.split("=");
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1],
      };
      expect(this.cookie.name).to.be.ok.and.eql("coderCookie");
      expect(this.cookie.value).to.be.ok;
    });
  });
});
