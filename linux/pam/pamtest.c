#include <security/pam_appl.h>
#include <security/pam_misc.h>
#include <security/pam_modules.h>
#include <stdio.h>
/* 文件pamtest.c
   此程序从命令行接收一个用户名作为参数,然后对这个用户名进行auth和account验证.
   */
// 定义一个pam_conv结构,用于与pam通信
static struct pam_conv conv = {
	misc_conv,
	NULL
};
// 主函数
int main(int argc, char *argv[])
{
	pam_handle_t *pamh=NULL;
	int retval;
	const char *user="nobody";
	const char *s1=NULL;

	if(argc == 2)
		user = argv[1];
	else
		exit(1);

	if(argc > 2) {
		fprintf(stderr, "Usage: pamtest0 [username]\n");
		exit(1);
	}
	printf("user: %s\n",user);
	retval = 0;

	//调用pamtest配置文件
	retval = pam_start("pamtest", user, &conv, &pamh);

	if (retval == PAM_SUCCESS)

		//进行auth类型认证
		retval = pam_authenticate(pamh, 0);    /* is user really user? */
	else {
		//如果认证出错,pam_strerror将输出错误信息.
		printf("pam_authenticate(): %d\n",retval);
		s1=pam_strerror( pamh, retval);
		printf("%s\n",s1);
	}
	if (retval == PAM_SUCCESS)

		//进行account类型认证
		retval = pam_acct_mgmt(pamh, 0);       /* permitted access? */
	else {
		printf("pam_acct_mgmt() : %d\n",retval);
		s1=pam_strerror( pamh, retval);
		printf("%s\n",s1);
	}
	/* This is where we have been authorized or not. */

	if (retval == PAM_SUCCESS) {
		fprintf(stdout, "Authenticated\n");
	} else {
		fprintf(stdout, "Not Authenticated\n");
	}

	if (pam_end(pamh,retval) != PAM_SUCCESS) {     /* close Linux-PAM */
		pamh = NULL;
		fprintf(stderr, "pamtest0: failed to release authenticator\n");
		exit(1);
	}

	return ( retval == PAM_SUCCESS ? 0:1 );       /* indicate success */
}
//END
