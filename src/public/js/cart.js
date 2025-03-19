// Function to increase the amount of a product in the cart
const increaseProductQuantity = async (cartId, productId) => {
	try {
		const response = await fetch(`/carts/${cartId}/product/${productId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const responseData = await response.json();

		if (responseData.error) {
			Swal.fire({
				title: 'Error!',
				text: responseData.message,
				icon: 'error',
				position: 'top-end',
				timer: 2000,
				showConfirmButton: false,
				toast: true,
			});
			return;
		}

		// reloadd the page to reflect the changes
		window.location.reload();
	} catch (error) {
		console.error('Network or unexpected error:', error.message || error);
	}
};

// Function to reduce the amount of a product in the cart
const decreaseProductQuantity = async (cartId, productId) => {
	try {
		const response = await fetch(`/carts/${cartId}/product/${productId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const responseData = await response.json();

		if (responseData.error) {
			Swal.fire({
				title: 'Error!',
				text: responseData.message,
				icon: 'error',
				position: 'top-end',
				timer: 2000,
				showConfirmButton: false,
				toast: true,
			});
			return;
		}

		// reload the page to reflect the changes
		window.location.reload();
	} catch (error) {
		console.error('Network or unexpected error:', error.message || error);
	}
};

// Function to delete an entire product from the cart
const deleteEntireProduct = async (cartId, productId) => {
	try {
		// Send a DELETE request to remove the entire product from the cart
		const response = await fetch(`/carts/${cartId}/product/${productId}/delete`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		const responseData = await response.json();

		if (responseData.error) {
			Swal.fire({
				title: 'Error!',
				text: responseData.message,
				icon: 'error',
				position: 'top-end',
				timer: 1500,
				showConfirmButton: false,
				toast: true,
			});
			return;
		}
		Swal.fire({
			title: 'Product removed',
			text: responseData.message,
			icon: 'success',
			position: 'top-end',
			timer: 2000,
			showConfirmButton: false,
			toast: true,
		});

		// reload the page to reflect the changes
		window.location.reload();
	} catch (error) {
		console.error('Network or unexpected error:', error.message || error);
		Swal.fire({
			title: 'Error!',
			text: 'An unexpected error occurred. Please try again.',
			icon: 'error',
			position: 'top-end',
			timer: 2000,
			showConfirmButton: false,
			toast: true,
		});
	}
};

// Function to delete an entire cart
const deleteCart = async (cartId) => {
	try {
		// Send a DELETE request to delete the cart
		const response = await fetch(`/carts/${cartId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});

		const responseData = await response.json();

		if (responseData.error) {
			await Swal.fire({
				title: 'Error!',
				text: responseData.message,
				icon: 'error',
				position: 'top-end',
				timer: 2000,
				showConfirmButton: false,
				toast: true,
			});
			return;
		}

		// Remove cartId from LocalStorage
		localStorage.removeItem('cartId');

		// Show success message and redirect after it disappears
		Swal.fire({
			title: 'Cart deleted',
			text: responseData.message,
			icon: 'success',
			position: 'top-end',
			timer: 2000,
			showConfirmButton: false,
			toast: true,
		}).then(() => {
			window.location.href = '/'; // Redirect to home after the alert disappears
		});
	} catch (error) {
		console.error('Network or unexpected error:', error.message || error);
		Swal.fire({
			title: 'Error!',
			text: 'An unexpected error occurred. Please try again.',
			icon: 'error',
			position: 'top-end',
			timer: 2000,
			showConfirmButton: false,
			toast: true,
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	// Get all buttons "+" , "-", "delete" and "delete cart"
	const increaseButtons = document.querySelectorAll('.btn-increase');
	const decreaseButtons = document.querySelectorAll('.btn-decrease');
	const deleteButtons = document.querySelectorAll('.button-delete');
	const deleteCartButtons = document.getElementById('button-delete-cart');

	// Add events to the buttons "+"
	increaseButtons.forEach((button) => {
		button.addEventListener('click', async () => {
			const cartId = button.getAttribute('data-cart-id');
			const productId = button.getAttribute('data-product-id');
			await increaseProductQuantity(cartId, productId);
		});
	});

	// Add events to the buttons "-"
	decreaseButtons.forEach((button) => {
		button.addEventListener('click', async () => {
			const cartId = button.getAttribute('data-cart-id');
			const productId = button.getAttribute('data-product-id');
			await decreaseProductQuantity(cartId, productId);
		});
	});

	// Add events to the buttons "delete"
	deleteButtons.forEach((button) => {
		button.addEventListener('click', async () => {
			const cartId = button.getAttribute('data-cart-id');
			const productId = button.getAttribute('data-product-id');
			await deleteEntireProduct(cartId, productId);
		});
	});
	// Add events to the buttons "delete cart"
	deleteCartButtons.addEventListener('click', async () => {
		const cartId = deleteCartButtons.getAttribute('data-cart-id');
		await deleteCart(cartId);
	});
});
