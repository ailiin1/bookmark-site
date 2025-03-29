// 暗色模式切换
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 从本地存储获取主题设置
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// 监听主题切换按钮点击
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 监听系统主题变化
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
});

// 搜索功能
const searchInput = document.querySelector('.search-box input');
const categoryCards = document.querySelectorAll('.category-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    categoryCards.forEach(card => {
        const links = card.querySelectorAll('a');
        let hasVisibleLinks = false;
        
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            const description = link.getAttribute('data-description').toLowerCase();
            
            if (text.includes(searchTerm) || description.includes(searchTerm)) {
                link.parentElement.style.display = 'block';
                hasVisibleLinks = true;
            } else {
                link.parentElement.style.display = 'none';
            }
        });
        
        card.style.display = hasVisibleLinks ? 'block' : 'none';
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 链接描述框功能
document.querySelectorAll('.category-card a').forEach(link => {
    const description = link.getAttribute('data-description');
    const descriptionDiv = link.nextElementSibling;
    
    // 设置描述文本
    descriptionDiv.textContent = description;
    
    // 鼠标移入时显示描述
    link.addEventListener('mouseenter', () => {
        descriptionDiv.style.opacity = '1';
        descriptionDiv.style.visibility = 'visible';
        descriptionDiv.style.transform = 'translateY(0)';
    });
    
    // 鼠标移出时隐藏描述
    link.addEventListener('mouseleave', () => {
        descriptionDiv.style.opacity = '0';
        descriptionDiv.style.visibility = 'hidden';
        descriptionDiv.style.transform = 'translateY(10px)';
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
}); 