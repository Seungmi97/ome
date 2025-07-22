package com.ome.dto.creator.response;

public record CreatorBookmarkAvgDto(
	Long userId,
	String username,
	Double avgBookmarks
){}
