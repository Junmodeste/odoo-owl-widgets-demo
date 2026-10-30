from odoo import fields, models


class OwlDemoTask(models.Model):
    """Modèle minimal servant de support aux deux widgets."""

    _name = "owl.demo.task"
    _description = "OWL Widgets Demo Task"

    name = fields.Char(required=True)
    quantity = fields.Integer(default=1)
    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("in_progress", "In Progress"),
            ("done", "Done"),
            ("blocked", "Blocked"),
        ],
        default="draft",
        required=True,
    )
