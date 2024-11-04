package pt.ua.deti.ies.plantpatrol.backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

@Service
public class GoogleSearchService {
    private static final String API_URL = "https://www.googleapis.com/customsearch/v1";
    private final WebClient webClient;
    @Value("${google.search-api-key}")
    private String API_KEY;
    @Value("${google.search-engine-id}")
    private String ENGINE_ID;

    public GoogleSearchService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> searchImage(String query) {
        String uri = UriComponentsBuilder.fromUriString(API_URL)
                .queryParam("key", API_KEY)
                .queryParam("cx", ENGINE_ID)
                .queryParam("searchType", "image")
                .queryParam("imgSize", "medium")
                .queryParam("num", "1")
                .queryParam("q", query + " plant")
                .build()
                .toUriString();

        return webClient
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .map(response ->
                        new JSONObject(response)
                            .getJSONArray("items")
                            .getJSONObject(0)
                            .getString("link")
                );
    }
}
