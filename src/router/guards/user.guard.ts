export function guardUser(to: any, from: any, next: any) {
    if (localStorage.getItem('user')) {
        next();
    } else {
        next('/login');
    }
}