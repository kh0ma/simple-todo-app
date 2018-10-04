import spark.Spark;

import static spark.Spark.*;

public class App {
    public String getGreeting() {
        return "Hello world.";
    }

    public static void main(String[] args) {
        var greeting = new App().getGreeting();
        port(5555);
        staticFileLocation("static");
        enableCorsSupport();
        get("/greetings", (req, res) -> greeting);
        get("/items", (req, res) -> {
            res.type("application/json");
            return "{\n" +
                    "  \"items\": [\n" +
                    "    { \"id\": 1, \"name\": \"Apples\", \"price\": \"$2\" },\n" +
                    "    { \"id\": 1, \"name\": \"Apples1\", \"price\": \"$2\" },\n" +
                    "    { \"id\": 1, \"name\": \"Apples2\", \"price\": \"$2\" },\n" +
                    "    { \"id\": 1, \"name\": \"Apples3\", \"price\": \"$2\" },\n" +
                    "    { \"id\": 1, \"name\": \"Apples4\", \"price\": \"$2\" },\n" +
                    "    { \"id\": 2, \"name\": \"Peaches\", \"price\": \"$5\" }\n" +
                    "  ] \n" +
                    "}";
        });
    }

    private static void enableCorsSupport() {
        Spark.staticFiles.header("Access-Control-Allow-Origin", "*");

        options("/*", (req, res) -> {
            String accessControlRequestHeaders = req.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                res.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = req.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                res.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.type("application/json");
        });
    }
}
