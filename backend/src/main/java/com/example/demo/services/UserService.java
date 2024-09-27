package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.User;
import com.example.demo.entity.UserType;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserTypeRepository;

@Service
public class UserService {

	@Autowired
	private UserTypeRepository userTypeRepository;
	@Autowired
	private UserRepository userRepository;

	public void createUser(@RequestBody User user) {
		userRepository.save(user);
	}

	public Iterable<User> findAllUsers() {
		return userRepository.findAll();
	}

	public User findUserById(int userId) {

		return userRepository.findById(userId).get();
	}

	public User updateUser(User user) {
		return userRepository.save(user);
	}

	public Optional<User> deleteUser(int userId) {
		Optional<User> user = userRepository.findById(userId);

		// throw exception if null

		if (user == null) {
			throw new RuntimeException("User id not found - " + userId);
		}

		return user;

	}

	public void createUserType(UserType userType) {
		userTypeRepository.save(userType);
	}

	public Iterable<UserType> findAllTypes() {
		return userTypeRepository.findAll();
	}

	public UserType findTypeById(int typeId) {

		UserType userType = userTypeRepository.findById(typeId).get();
		if (userType == null) {
			throw new RuntimeException("Type id not found - " + typeId);
		}

		return userType;
	}

	public UserType updateUserType(UserType userType) {
		return userTypeRepository.save(userType);
	}

	public UserType deleteUserType(int userTypeId) {
		UserType userType = userTypeRepository.findById(userTypeId).get();

		if (userType != null) {
			userTypeRepository.deleteById(userTypeId);
			return userType;
		} else {
			return null;
		}
	}
}
