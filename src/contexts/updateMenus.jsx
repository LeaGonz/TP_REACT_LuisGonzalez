export default async function updateMenus(userMenus) {
    const email = localStorage.getItem("email");
    const fullName = `${localStorage.getItem("firstName") || ""} ${localStorage.getItem("lastName") || ""}`.trim();

    const response = await fetch("http://localhost:3000/user-menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            name: fullName,
            menus: userMenus
        })
    });

    if (!response.ok) throw new Error("Error al actualizar pedidos");
    return response.json();
}