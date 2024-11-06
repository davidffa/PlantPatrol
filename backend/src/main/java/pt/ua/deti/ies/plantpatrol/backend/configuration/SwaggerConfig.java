package pt.ua.deti.ies.plantpatrol.backend.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI defineOpenAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Development");

        Info information = new Info()
                .title("PlantPatrol REST API")
                .version("1.0")
                .description("REST API for the PlantPatrol IES Project");

        return new OpenAPI().info(information).servers(List.of(server));
    }
}
