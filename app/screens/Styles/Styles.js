import color from "./color";

export default {
  firstContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 120,
    width: "90%",
    justifyContent: "center",
  },
  loginSelect: {
    height: 40,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: color.primary,
    paddingTop: 10,
  },
  text: {
    textAlign: "center",
    color: color.white,
  },
  input: {
    height: 50,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#95228f",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  mainButton: {
    width: 200,
    height: 40,
    color: "#fff",
    fontWeight: "600",
    paddingTop: 10,
    marginTop: 30,
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#95228f",
    cursor: "pointer",
  },
  TagLine: {
    color: color.textBlue,
    fontSize: 18,
  },
  signup: {
    flex: 1,
    backgroundColor: "#212631 ",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    width: "86%",
    height: 45,
    borderColor: color.primary,
    marginBottom: 18,
    paddingHorizontal : 6
  },
  SignButton: {
    backgroundColor: color.primary,
    height: 45,
    borderRadius: 5,
    paddingTop: 10,
  },
  textCenter: {
    color: color.white,
    textAlign: "center",
    fontSize: 20,
  },
  textStyle: {
    color: color.textBlue,
    lineHeight: 20,
    marginBottom: 26,
  },
};
