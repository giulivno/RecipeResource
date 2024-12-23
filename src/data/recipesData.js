export const recipesData = [
    {
        id: 1,
        title: "Chicken Alfredo",
        description: "A creamy pasta dish with chicken breast, Parmesan, and Alfredo sauce.",
        image: `${process.env.PUBLIC_URL}/assets/chicken_alfredo.jpg`,
        time: "40 min",
        ingredients: [
            "Pasta", "Chicken breast", "Parmesan cheese", "Butter", "Olive oil", "Garlic"
        ],
        instructions: [
            "Step 1: Cook the pasta in salted water until al dente.",
            "Step 2: In a pan, cook the chicken breast in olive oil until browned.",
            "Step 3: Melt butter in the pan, add garlic, and cook for 2 minutes.",
            "Step 4: Stir in the Parmesan cheese and cooked pasta.",
            "Step 5: Combine and cook for another 5 minutes before serving."
        ],
        rating: 5,
        dietaryRestrictions: ["No shellfish", "No eggs", "No nuts"],
    },
    {
        id: 2,
        title: "Vegetarian Alfredo",
        description: "A creamy Alfredo pasta without any meat, served with mushrooms and spinach.",
        image: `${process.env.PUBLIC_URL}/assets/vegetarian_alfredo.jpg`,
        time: "35 min",
        ingredients: [
            "Pasta", "Spinach", "Mushrooms", "Parmesan cheese", "Butter", "Olive oil", "Garlic"
        ],
        instructions: [
            "Step 1: Cook the pasta in salted water until al dente.",
            "Step 2: In a pan, cook mushrooms in olive oil until softened.",
            "Step 3: Add spinach and garlic to the pan, cooking until wilted.",
            "Step 4: Stir in butter and Parmesan cheese.",
            "Step 5: Combine with cooked pasta and serve immediately."
        ],
        rating: 5,
        dietaryRestrictions: ["No meat", "No shellfish", "No eggs", "No nuts"],
    },
    {
        id: 3,
        title: "Chicken Parmesan",
        description: "A classic Italian dish of breaded chicken served with marinara sauce and melted cheese.",
        image: `${process.env.PUBLIC_URL}/assets/chicken_parmesan.jpg`,
        time: "50 min",
        ingredients: [
            "Chicken breast", "Breadcrumbs", "Parmesan cheese", "Olive oil", "Tomatoes", "Pasta"
        ],
        instructions: [
            "Step 1: Bread the chicken breasts with Parmesan and breadcrumbs.",
            "Step 2: Fry the chicken in olive oil until golden brown.",
            "Step 3: Serve with marinara sauce and a side of pasta."
        ],
        rating: 5,
        dietaryRestrictions: ["No shellfish", "No eggs", "No nuts"],
    },
    {
        id: 4,
        title: "Pasta Primavera",
        description: "A light pasta dish with bell peppers, tomatoes, and Parmesan cheese.",
        image: `${process.env.PUBLIC_URL}/assets/pasta_primavera.jpg`,
        time: "30 min",
        ingredients: [
            "Pasta", "Bell peppers", "Tomatoes", "Olive oil", "Parmesan cheese", "Garlic"
        ],
        instructions: [
            "Step 1: Cook the pasta in salted water until al dente.",
            "Step 2: In a pan, saute bell peppers and tomatoes in olive oil.",
            "Step 3: Add garlic and cook for 1 minute.",
            "Step 4: Toss in the pasta and Parmesan cheese before serving."
        ],
        rating: 4,
        dietaryRestrictions: ["No meat", "No shellfish", "No eggs", "No nuts"],
    },
    {
        id: 5,
        title: "Chicken-Avocado Salad",
        description: "A fresh salad made with chicken, avocado, spinach, and a light olive oil dressing.",
        image: `${process.env.PUBLIC_URL}/assets/chicken_avocado_salad.jpg`,
        time: "25 min",
        ingredients: [
            "Chicken breast", "Avocado", "Spinach", "Olive oil", "Garlic", "Bell peppers"
        ],
        instructions: [
            "Step 1: Grill the chicken breast and slice thinly.",
            "Step 2: Slice avocado and bell peppers.",
            "Step 3: Toss spinach, avocado, and peppers in olive oil and garlic dressing.",
            "Step 4: Add chicken on top and serve."
        ],
        rating: 4,
        dietaryRestrictions: ["No gluten", "No lactose", "No shellfish", "No eggs", "No nuts"],
    },
    {
        id: 6,
        title: "Stuffed Bell Peppers",
        description: "Bell peppers stuffed with rice, beans, and vegetables, perfect for a vegetarian meal.",
        image: `${process.env.PUBLIC_URL}/assets/stuffed_bell_peppers.jpg`,
        time: "45 min",
        ingredients: [
            "Bell peppers", "Rice", "Black beans", "Tomatoes", "Olive oil", "Onion", "Garlic"
        ],
        instructions: [
            "Step 1: Cook rice and black beans until tender.",
            "Step 2: Saute onion and garlic in olive oil.",
            "Step 3: Mix the rice, beans, tomatoes, and sauteed onions together.",
            "Step 4: Stuff the bell peppers with the mixture and bake for 30 minutes."
        ],
        rating: 5,
        dietaryRestrictions: ["No meat", "No gluten", "No lactose", "No shellfish", "No eggs", "No nuts"],
    },
    {
        id: 7,
        title: "Tomato Basil Pasta",
        description: "A simple pasta dish with tomatoes, basil, and garlic.",
        image: `${process.env.PUBLIC_URL}/assets/tomato_basil_pasta.jpg`,
        time: "25 min",
        ingredients: [
            "Pasta", "Tomatoes", "Garlic", "Olive oil", "Basil", "Parmesan cheese"
        ],
        instructions: [
            "Step 1: Cook the pasta in salted water until al dente.",
            "Step 2: In a pan, cook garlic and tomatoes in olive oil.",
            "Step 3: Toss in the pasta and fresh basil.",
            "Step 4: Garnish with Parmesan cheese and serve."
        ],
        rating: 5,
        dietaryRestrictions: ["No meat", "No shellfish", "No eggs", "No nuts"],
    },
];
