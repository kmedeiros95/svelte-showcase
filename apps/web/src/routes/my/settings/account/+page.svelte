<script>
	import { Input, Modal } from '$lib/components';
    import { enhance, applyAction } from '$app/forms';

	export let form;
	export let data;

	let emailModalOpen;
	let userNameModalOpen;
    let loading;


	$: emailModalOpen = false;
	$: userNameModalOpen = false;
    $: loading = false;


    const submitUpdateEmail = () => {
        loading = true
        emailModalOpen = true
        return async({result}) =>{
            switch(result.type){
                case 'success':
                    await invalidateAll();
                    emailModalOpen = false
                    break
                case 'error':
                    break
                default:
                    await applyAction(result)
            }
            loading = false
        }
    }
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Email</h3>
		<div class="divider" />
		<Modal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Email</span>
			<h3 slot="heading">Change Your Email</h3>
			<form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
				<Input
					label="Enter your new email address"
					id="email"
					type="email"
					required={true}
					value={form?.data?.email}
                    disabled={loading}
				/>
				<button type="submit" class="btn btn-primary w-full"  disabled={loading}>Change My Email</button>
			</form>
		</Modal>
	</div>
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Username</h3>
		<div class="divider mb-0.5" />
		<Input id="username" label="Username" value={data?.user?.username} disabled />
		<Modal label="change-username" checked={userNameModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Username</span>
			<h3 slot="heading">Change Your Username</h3>
			<form action="?/updateUsername" method="POST" class="space-y-2">
				<Input
					label="Enter your new username"
					id="username"
					type="text"
					required={true}
					value={form?.data?.username}
				/>
				<button type="submit" class="btn btn-primary w-full">Change My Username</button>
			</form>
		</Modal>
	</div>
</div>
