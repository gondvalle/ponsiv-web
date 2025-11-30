import React, { createContext, useContext, useState, useEffect } from 'react';
import brandsData from '../data/brands.json';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored session
        const storedUser = localStorage.getItem('brand_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                const brand = brandsData.find(
                    (b) => b.contactEmail.toLowerCase() === email.toLowerCase() && b.password === password
                );

                if (brand) {
                    const userData = {
                        id: brand.id,
                        name: brand.brandName,
                        email: brand.contactEmail,
                        logo: brand.logoPath,
                        role: brand.role,
                    };
                    setUser(userData);
                    localStorage.setItem('brand_user', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Credenciales incorrectas'));
                }
            }, 500);
        });
    };

    const register = (brandName, email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userData = {
                    id: Date.now().toString(),
                    name: brandName,
                    email: email,
                    logo: '/assets/logos/default_brand.png', // Placeholder
                    role: 'brand',
                };
                setUser(userData);
                localStorage.setItem('brand_user', JSON.stringify(userData));
                resolve(userData);
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('brand_user');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
