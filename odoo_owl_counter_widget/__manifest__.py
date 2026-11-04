{
    "name": "OWL Widgets Demo (counter, status badge)",
    "summary": "Educational OWL field widgets for Odoo 17: counter and status badge",
    "version": "17.0.1.1.0",
    "category": "Hidden/Tools",
    "license": "LGPL-3",
    "author": "Koffi Modeste Junior",
    "website": "https://github.com/Junmodeste/odoo-owl-widgets-demo",
    "depends": ["web"],
    "data": [
        "security/ir.model.access.csv",
        "views/owl_demo_task_views.xml",
    ],
    "demo": [
        "demo/owl_demo_task_demo.xml",
    ],
    "assets": {
        # Chargés dans le client web (backend).
        "web.assets_backend": [
            "odoo_owl_counter_widget/static/src/**/*",
        ],
        # Chargés uniquement par la page de tests JS /web/tests (QUnit).
        "web.qunit_suite_tests": [
            "odoo_owl_counter_widget/static/tests/**/*.test.js",
        ],
    },
    "installable": True,
    "application": True,
}
