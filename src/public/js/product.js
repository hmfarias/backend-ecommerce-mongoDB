// Function to obtain the LocalStorage cart (if it exists)
const getCartIdFromStorage = () => {
	return localStorage.getItem('cartId');
};

// Function to create an empty cart and then add a product to the cart
const createCartAndAddProduct = async (productId) => {
	let cartId = getCartIdFromStorage(); // Verify if we already have a cart

	// If we don't have a cart, we create a new one
	if (!cartId) {
		try {
			// Step 1: Create an empty cart
			const createCartResponse = await fetch('/carts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({}),
			});

			// Parse the response as JSON
			const responseData = await createCartResponse.json();

			if (responseData.error) {
				console.error('Error creating cart:', responseData.message);
				return;
			}

			// Extract the cart ID from the payload
			cartId = responseData.payload.id; // Assign the ID of the new cart

			// Save the cart ID in LocalStorage
			localStorage.setItem('cartId', cartId);

			// Show a success message
			// alert('Cart created successfully!');
			await Swal.fire({
				title: 'Success!',
				text: 'Cart created successfully!',
				icon: 'success',
				position: 'top-end',
				timer: 1500,
				showConfirmButton: false,
				toast: true,
			});
		} catch (error) {
			console.error('Network or unexpected error:', error.message || error);
			return;
		}
	}

	// Step 2: Add the product to the existing cart or to the newly created one
	await addProductToCart(cartId, productId); // Send the productId and the cartId
};

// Function to add a product to the cart
const addProductToCart = async (cartId, productId) => {
	try {
		const addProductResponse = await fetch(`/carts/${cartId}/product/${productId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});

		// Parse the response as JSON
		const responseData = await addProductResponse.json();

		// Check if the response indicates an error
		if (responseData.error) {
			console.error('Error adding product to cart:', responseData.message);
			return;
		}

		// Show a success message
		Swal.fire({
			title: 'Success!',
			text: 'Product added to cart successfully!',
			icon: 'success',
			position: 'top-end',
			timer: 1500,
			showConfirmButton: false,
			toast: true,
		});
	} catch (error) {
		console.error('Network or unexpected error:', error.message || error);
	}
};

// Function to remove or decrease product quantity from the cart
const removeProductFromCart = async (cartId, productId) => {
	try {
		const removeProductResponse = await fetch(`/carts/${cartId}/product/${productId}`, {
			method: 'DELETE', // Use DELETE method for removing/reducing quantity
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const responseData = await removeProductResponse.json();

		if (responseData.error) {
			Swal.fire({
				title: 'Warning!',
				text: responseData.message,
				icon: 'warning',
				position: 'top-end',
				timer: 1500,
				showConfirmButton: false,
				toast: true,
			});

			return;
		}
		Swal.fire({
			title: 'Updated!',
			text: 'Product substracted from cart successfully!',
			icon: 'info',
			position: 'top-end',
			timer: 2000,
			showConfirmButton: false,
			toast: true,
		});
	} catch (error) {
		console.error('Network or unexpected error:', error.message || error);
	}
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
	// Get the "+" button
	const addToCartButton = document.getElementById('add-to-cart-btn');
	// Get the "-" button
	const removeFromCartButton = document.getElementById('subs-to-cart-btn');

	// Add click event listener to the button
	addToCartButton.addEventListener('click', async function () {
		// Get the product ID from the button's data attribute
		const productId = this.getAttribute('data-product-id');
		// Create the cart (if it doesn't exist) and add the product
		await createCartAndAddProduct(productId);
	});

	// Add event listener to "Remove from Cart" button
	removeFromCartButton.addEventListener('click', async function () {
		const productId = this.getAttribute('data-product-id');
		const cartId = getCartIdFromStorage();

		if (!cartId) {
			console.warn('No cart found in storage.');
			Swal.fire({
				title: 'Warning!',
				text: 'No cart found in storage',
				icon: 'warning',
				position: 'top-end',
				timer: 2000,
				showConfirmButton: false,
				toast: true,
			});
			return;
		}

		await removeProductFromCart(cartId, productId);
	});
});
