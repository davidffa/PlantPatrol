package pt.ua.deti.ies.plantpatrol.backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import pt.ua.deti.ies.plantpatrol.backend.dto.inventory.GeminiResponseDTO;
import reactor.core.publisher.Mono;

@Service
public class GeminiService {
    @Value("${gemini.api-key}")
    private String API_KEY;

    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    private static final String REQ_BODY = "{\"contents\":[{\"parts\":[{\"text\":\"Give me a short description about a %s plant, without markdown. Maximum of 4 lines.\"},{\"text\":\"Give me 2 curiosities about that plant\"},{\"text\":\"Give me the plant family and max height, in meters\"}]}],\"generationConfig\":{\"response_mime_type\":\"application/json\",\"response_schema\":{\"type\":\"OBJECT\",\"properties\":{\"description\":{\"type\":\"STRING\"},\"curiosities\":{\"type\":\"STRING\"},\"family\":{\"type\":\"STRING\"},\"maxHeight\":{\"type\":\"INTEGER\"}}}}}";
    private final WebClient webClient;

    public GeminiService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<GeminiResponseDTO> getPlantDetails(String plantName) {
        return webClient.post()
                .uri(API_URL + "?key=" + API_KEY)
                .bodyValue(String.format(REQ_BODY, plantName))
                .retrieve()
                .bodyToMono(String.class)
                .map(response -> {
                    JSONObject json = new JSONObject(response);
                    String text = json
                            .getJSONArray("candidates")
                            .getJSONObject(0)
                            .getJSONObject("content")
                            .getJSONArray("parts")
                            .getJSONObject(0)
                            .getString("text");

                    JSONObject textJson = new JSONObject(text);

                    return GeminiResponseDTO
                            .builder()
                            .description(textJson.getString("description"))
                            .curiosities(textJson.getString("curiosities"))
                            .family(textJson.getString("family"))
                            .maxHeight(textJson.getInt("maxHeight"))
                            .build();
                });
    }
}
