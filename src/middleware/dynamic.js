export const styles = (req, res, next) => {
    res.locals.styles = res.locals.styles || [];
    return res.locals.styles.push('public/css/main.css');
    next();
}

export const scripts = (req, res, next) => {
    res.locals.scripts = res.locals.scripts || [];
    return res.locals.scripts.push('public/js/main.js');
    next();
}