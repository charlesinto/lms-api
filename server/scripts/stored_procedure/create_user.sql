CREATE DEFINER=`root`@`localhost` PROCEDURE `lms_signup_user`(
IN firstName varchar(200), 
IN lastName varchar(200),
IN email varchar(200),
IN username varchar(200),
IN phoneNumber varchar(200),
IN token varchar(350),
IN isLoggedIn int,
IN roleid int,
IN isActive int,
IN resetPassword int,
IN schoolId int,
IN password varchar(300)
)
BEGIN
	declare foundRow int;
	SELECT * FROM USERS WHERE username = username or email = email;
    SELECT found_rows() into foundRow ;
    IF (SELECT foundRow > 0)
	THEN
		SELECT 'Email or Username exists' as Message;
        
	ELSE 
		insert into users(
		firstName, lastName,email,username,phoneNumber,token,isLoggedIn,
		roleid,isActive,resetPassword,schoolId,password
        )
        values(firstName, lastName,email,username,phoneNumber,token,isLoggedIn,
		roleid,isActive,resetPassword,schoolId,password);
        
        SELECT 'Operation Success' as Message;
    END IF;
    
END