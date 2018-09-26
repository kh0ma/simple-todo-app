import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFileLocation;

/*
 * This Java source file was generated by the Gradle 'init' task.
 */
public class App {
    public String getGreeting() {
        return "Hello world.";
    }

    public static void main(String[] args) {
        var greeting = new App().getGreeting();
        port(5555);
        staticFileLocation("static");
        get("/greetings", (req, res) -> greeting);
    }
}
