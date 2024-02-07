package group1.backend.controllers;

class ItemRequest {
    private Long id;
    private String title;
    private String url;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ItemRequest(Long id, String title, String url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }

}
