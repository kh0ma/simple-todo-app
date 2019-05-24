import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.port;
import static spark.Spark.staticFileLocation;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Spark;

public class App {
    public static final Gson OBJECT_MAPPER;

    static {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setPrettyPrinting();
        OBJECT_MAPPER = gsonBuilder.create();
    }

    public static void main(String[] args) {
        var greeting = new App().getGreeting();
        String port = System.getProperty("server.port");
        if (port.matches("-?\\d+(\\.\\d+)?")) {
             port(Integer.valueOf(port));
        } else {
            port(5555);
        }
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

        PostAndRetrieveMessage.apply();
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
        });
    }

    public String getGreeting() {
        return "Hello world.";
    }
}
