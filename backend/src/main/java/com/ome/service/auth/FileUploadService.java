package com.ome.service.auth;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ome.common.constants.ImageConstants;

import lombok.RequiredArgsConstructor;

// 🌟🌟 회원 가입 시 프로필 사진 업로드시 사용할 서비스 로직
@Service
@RequiredArgsConstructor
public class FileUploadService {
	 @Value("${upload.path:uploads/profile}")
	 private String uploadDir;
	 
	 // mutipartFile 을 받아서 로컬에 저장한 후 url 경로 반환하기 
	 public String uploadProfileImage (MultipartFile file) {
		 if(file.isEmpty() || file == null) {
			 return ImageConstants.DEFAULT_PROFILE_IMAGE_URL;
		 }
		 
		 
		 String originalFilename = file.getOriginalFilename();
		 String ext ="";
		 
		  int dotIndex = originalFilename.lastIndexOf('.');
	      if (dotIndex >= 0) {
	         ext = originalFilename.substring(dotIndex);
	      }

	      String uniqueFilename = UUID.randomUUID().toString() + ext;
	      
	      // uploadDir 경로를 실제 파일 객체로 생성하기
	      String projectRoot = System.getProperty("user.dir");
	      File uploadPath = Paths.get(projectRoot, uploadDir).toFile();

	      if (!uploadPath.exists()) {
	          uploadPath.mkdirs();
	      }
	      
	      
	      File destination = new File(uploadPath, uniqueFilename);
	      
	      try {
	          file.transferTo(destination);
	      } catch (IOException e) {
	          throw new RuntimeException("파일 저장 실패: " + destination.getAbsolutePath(), e);
	      }

	      // 프론트에서 접근 가능한 상대 URL 반환
	      return "/profile/" + uniqueFilename;
	 }
	

}
