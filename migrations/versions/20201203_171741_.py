"""empty message

Revision ID: d93b03ce76f6
Revises: 9d52466a5279
Create Date: 2020-12-03 17:17:41.558559

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd93b03ce76f6'
down_revision = '9d52466a5279'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_tags', 'userId',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('user_tags', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_tags', sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
    op.alter_column('user_tags', 'userId',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
